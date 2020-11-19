const moment = require('moment');
let reports = {};
const excel = require('node-excel-export');
const _ = require('lodash');
const fieldMap = {
  id: 'Mã khách hàng',
  name: 'Tên',
  phone: 'Số điện thoại',
  email: 'Thư điện tử',
  identification: 'Chứng minh thư',
  gender: 'Giới tính',
  address: 'Địa chỉ',
  point: 'Điểm',
  username: 'Tên đăng nhập',
  role: 'Nhóm quyền',
  group: 'Hạng khách hàng',
  partner: 'Đối tác',
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
    let roleIds = [], groupIds = [];
    data.map(d => {
      d.gender = d.gender == 1 ? 'Nam' : 'Nữ';
      if (d.role && !_.includes(roleIds, d.voucher)) roleIds.push(d.role);
      if (d.group && !_.includes(groupIds, d.group)) groupIds.push(d.group);
    })
    let promises = [
      Role.find({ where: { id: roleIds }, select: ['id', 'name'] }),
      Group.find({ where: { id: groupIds }, select: ['id', 'name'] })
    ];
    let rs = await Promise.all(promises);
    data.map(d => {
      d.role = getName(rs[0], d.role);
      d.group = getName(rs[1], d.group);
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