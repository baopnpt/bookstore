const moment = require('moment');
let reports = {};
const excel = require('node-excel-export');
const _ = require('lodash');
const fieldMap = {
  createdAt: 'Ngày tạo',
  updatedAt: 'Ngày sửa',
  id: 'ID voucher',
  partner: 'Đối tác',
  name: 'Tên voucher',
  description: 'Mô tả',
  price: 'Giá trị',
  exchangePoint: 'Điểm quy đổi',
  percent: 'Phần trăm giảm giá',
  giftPoint: 'Tặng điểm',
  billPercent: 'Tặng điểm phần trăm',
  maxBillPoint: 'Điểm tặng tối đa',
  stamp: 'Số tem cần tích',
  stampGift: 'Quà tặng tích tem',
  gift: 'Quà tặng',
  startDate: 'Ngày bắt đầu',
  endDate: 'Ngày kết thúc',
  startTime: 'Giờ bắt đầu',
  endTime: 'Giờ kết thúc',
  like: 'Số lượt thích',
  view: 'Số lượt xem',
  comment: 'Số bình luận',
  rate: 'Số đánh giá',
  totalRate: 'Tổng sao đánh giá',
  avgRate: 'Đánh giá trung bình',
  hot: 'Đặt làm hot',
  codeType: 'Kiểu sinh mã',
  codeTime: 'Thời gian sống của code',
  codeLength: 'Độ dài code',
  fixedCode: 'Mã code đặt cứng',
  checkout: 'Kiểu đối soát mã',
  tags: 'Thẻ tìm kiếm',
  inventory: 'Kho',
  isApproved: 'Tình trạng duyệt',
  value: 'Giá trị',
  active: 'Kích hoạt',
  isBanner: 'Đặt làm banner',
  hotLine: 'Số hotline',
  term: 'Điều khoản sử dụng',
  campaign: 'Chiến dịch',
  condition: 'Điều kiện',
  category: 'Lĩnh vực',
  creator: 'ID người tạo',
  source: 'Nguồn'
}
module.exports = {


  friendlyName: 'Điền chi tiết thông tin vào báo cáo danh sách người dùng',


  description: '',


  inputs: {
    data: { type: 'ref', description: 'Dữ liệu thuần từ bảng user' }
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

    let types = ['number', 'string', 'date', 'boolean']
    const specification = {};
    //fix data
    let sourceIds = [], partnerIds = [], categoryIds = [], conditionIds = [], campaignIds = [];
    data.map(d => {
      d.active = d.active ? 'Bật' : 'Tắt';
      d.hot = d.hot ? 'Bật' : 'Tắt';
      d.isBanner = d.isBanner ? 'Bật' : 'Tắt';
      d.isApproved = d.isBanner ? 'Đã duyệt' : 'Chưa duyệt';
      d.createdAt = d.createdAt ? moment(d.createdAt).format('YYYY/MM/DD HH:mm:ss') : '';
      d.updatedAt = d.updatedAt ? moment(d.updatedAt).format('YYYY/MM/DD HH:mm:ss') : '';
      d.startDate = d.startDate ? moment(d.startDate).format('YYYY/MM/DD HH:mm:ss') : '';
      d.endDate = d.endDate ? moment(d.endDate).format('YYYY/MM/DD HH:mm:ss') : '';
      d.startTime = d.startTime ? moment(d.startTime).format('HH:mm') : '';
      d.endTime = d.endTime ? moment(d.endTime).format('HH:mm') : '';
      if (d.source && !_.includes(sourceIds, d.source)) sourceIds.push(d.source);
      if (d.partner && !_.includes(partnerIds, d.partner)) partnerIds.push(d.partner);
      if (d.category && !_.includes(categoryIds, d.category)) categoryIds.push(d.category);
      if (d.condition && !_.includes(conditionIds, d.condition)) conditionIds.push(d.condition);
      if (d.campaign && !_.includes(campaignIds, d.campaign)) campaignIds.push(d.campaign);
    })
    let promises = [
      Source.find({ where: { id: sourceIds }, select: ['id', 'name'] }),
      Partner.find({ where: { id: partnerIds }, select: ['id', 'name'] }),
      Category.find({ where: { id: categoryIds }, select: ['id', 'name'] }),
      Condition.find({ where: { id: conditionIds }, select: ['id', 'name'] }),
      Campaign.find({ where: { id: campaignIds }, select: ['id', 'name'] }),
    ];
    let rs = await Promise.all(promises);
    data.map(d => {
      d.source = getName(rs[0], d.source);
      d.partner = getName(rs[1], d.partner);
      d.category = getName(rs[2], d.category);
      d.condition = getName(rs[3], d.condition);
      d.campaign = getName(rs[4], d.campaign);
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