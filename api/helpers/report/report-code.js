const moment = require('moment');
let reports = {};
const excel = require('node-excel-export');
const _ = require('lodash');
const fieldMap = {
  createdAt: 'Ngày lấy mã',
  code: 'Mã voucher',
  used: 'Sử dụng',
  usedAt: 'Thời gian sử dụng',
  isExpired: 'Còn hạn',
  expiredAt: 'Thời điểm hết hạn',
  bill: 'Tổng tiền',
  receipt: 'Hóa đơn',
  receiptImage: 'Ảnh chụp hóa đơn',
  phone: 'Số điện thoại',
  age: 'Tuổi',
  gender: 'Giới tính',
  percent: 'Phàn trăm giảm',
  exchangePoint: 'Điểm quy đổi',
  rate: 'Đánh giá',
  user: 'ID khách',
  voucher: 'Voucher',
  partner: 'Đối tác',
  shop: 'ID cửa hàng sử dụng',
  shopAccount: 'Tài khoản nhân viên',
  province: 'Tỉnh của khách',
  source: 'Nguồn',
  campaign: 'Chiến dịch',
  category: 'Lĩnh vực',
  condition: 'Điều kiện lấy mã',
  createType: 'Kiểu lấy mã'
}
module.exports = {


  friendlyName: 'Điền chi tiết thông tin vào báo cáo mã voucher',


  description: '',


  inputs: {
    data: { type: 'ref', description: 'Dữ liệu thuần từ bảng code' }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    let { data } = inputs;
    const styles = {
      headerDark: {
        fill: {
          fgColor: {
            rgb: 'dcdcdc'
          }
        },
        font: {
          color: {
            rgb: '000000'
          },
          sz: 12,
          bold: true,
          underline: false
        }
      },
      cellWhite: {
        fill: {
          fgColor: {
            rgb: 'ffffff'
          }
        }
      },
      cellPink: {
        fill: {
          fgColor: {
            rgb: 'FFFFCCFF'
          }
        }
      },
      cellGreen: {
        fill: {
          fgColor: {
            rgb: 'FF00FF00'
          }
        }
      }
    };

    //Array of objects representing heading rows (very top)
    const heading = [
      [{ value: 'a1', style: styles.headerDark }, { value: 'b1', style: styles.headerDark }, { value: 'c1', style: styles.headerDark }],
      ['a2', 'b2', 'c2'] // <-- It can be only values
    ];
    let types = ['number', 'string', 'date', 'boolean']
    const specification = {};
    //fix data
    let voucherIds = [0], partnerIds = [0], provinceIds = [0], sourceIds = [0], campaignIds = [0];
    data.map(d => {
      d.createType = d.createType === 1 ? 'Khách hàng tự lấy' : 'Hệ thống tặng quà';
      d.used = d.used ? 'Đã sử dụng' : 'Chưa sử dụng';
      d.usedAt = d.usedAt ? moment(d.usedAt).format('YYYY/MM/DD HH:mm:ss') : '';
      d.createdAt = d.createdAt ? moment(d.createdAt).format('YYYY/MM/DD HH:mm:ss') : '';
      d.updatedAt = d.updatedAt ? moment(d.updatedAt).format('YYYY/MM/DD HH:mm:ss') : '';
      d.isExpired = d.isExpired ? 'Đã hết hạn' : 'Còn hạn';
      d.expiredAt = moment(d.expiredAt).format('YYYY/MM/DD HH:mm:ss');
      if (d.voucher && !_.includes(voucherIds, d.voucher)) voucherIds.push(d.voucher);
      if (d.partner && !_.includes(partnerIds, d.partner)) partnerIds.push(d.partner);
      if (d.province && !_.includes(provinceIds, d.province)) provinceIds.push(d.province);
      if (d.source && !_.includes(sourceIds, d.source)) sourceIds.push(d.source);
      if (d.campaign && !_.includes(campaignIds, d.campaign)) campaignIds.push(d.campaign);
    })
    let promises = [
      Voucher.find({ where: { id: voucherIds }, select: ['id', 'name'] }),
      Partner.find({ where: { id: partnerIds }, select: ['id', 'name'] }),
      Province.find({ where: { id: provinceIds }, select: ['id', 'name'] }),
      Source.find({ where: { id: sourceIds }, select: ['id', 'name'] }),
      Campaign.find({ where: { id: campaignIds }, select: ['id', 'name'] }),
      Category.find(),
      Condition.find()
    ];
    let rs = await Promise.all(promises);
    data.map(d => {
      d.voucher = getName(rs[0], d.voucher);
      d.partner = getName(rs[1], d.partner);
      d.province = getName(rs[2], d.province);
      d.source = getName(rs[3], d.source);
      d.campaign = getName(rs[4], d.campaign);
      d.category = getName(rs[5], d.category);
      d.condition = getName(rs[6], d.condition);
    })
    for (var i in data[0]) {
      // console.log(typeof (data[0][i]));
      if (!_.includes(types, typeof (data[0][i]))) {
        continue;
      }
      specification[i] = { // <- the key should match the actual data key
        displayName: fieldMap[i] || i, // <- Here you specify the column header
        headerStyle: styles.headerDark, // <- Header style
        width: 120 // <- width in pixels
      }
    }


    // Create the excel report.
    // This function will return Buffer
    const report = excel.buildExport(
      [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
        {
          name: 'Report', // <- Specify sheet name (optional)
          // heading: heading, // <- Raw heading array (optional)
          // merges: merges, // <- Merge cell ranges
          specification: specification, // <- Report specification
          data // <-- Report data
        }
      ]
    );
    return exits.success(report);
  }


};

let getName = (arr, id) => {
  if (arr.length == 0 || !id) return '';
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i].name;
    }
  }
}