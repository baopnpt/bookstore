
module.exports = {


  friendlyName: 'Create user',


  description: '',


  inputs: {
    name: { type: 'string', description: 'Tên người dùng', required: true },
    phone: { type: 'string', description: 'Số điện thoại người dùng' },
    email: { type: 'string', description: 'Địa chỉ email' },
    // identification: { type: 'string', description: 'Chứng minh thư người dùng' },
    role: { type: 'number', description: 'Nhóm quyền', required: true },
    sex: { type: 'number', description: 'Giới tính' },
    phone: { type: 'number', description: 'Giới tính' },
    address: { type: 'string', description: 'Địa chỉ' },
    // group: { type: 'number', description: 'Hạng khách hàng' },
    // point: { type: 'number', description: 'Điểm khách hàng' },
    username: { type: 'string', description: 'Tên đăng nhập', required: true },
    password: { type: 'string', description: 'Mật khẩu đăng nhập', required: true },
    positionId : {type: 'number'},
    departmentId : {type: 'number'},
    salaryId : {type: 'number'},
    literacyId : {type: 'number'},
    birthday : {type: 'number'},
    // confirmPassword: { type: 'string', description: 'Mật khẩu xác nhận', required: true },
    // partner: { type: 'number', description: 'Quản lý đối tác' },
    // source: { type: 'number', description: 'Quản lý nguồn' }
  },


  exits: {
    success: {
      statusCode: 200
    },
    fail: {
      statusCode: 400
    }
  },


  fn: async function (inputs, exits) {
    try {
      // if (inputs.password !== inputs.confirmPassword) throw new Error(Err.CODE.INVALID_CONFIRM_PASSWORD)
      if (!sails.helpers.common.checkPasswordStrength(inputs.password))
        throw "Mật khẩu không đủ mạnh!";
      let [userinfo] = await Admin.find({username : inputs.username});
      if(userinfo){
        throw "Tài khoản đã được đăng ký trước đó. Vui lòng chọn tên đăng nhập khác!";
      }
      try {
        inputs.password = sails.helpers.common.hash(inputs.password);
        await Admin.create(inputs);
      } catch (err) {
        throw new Error(err);
      }
      return exits.success({ code: 0, message: sails.__('Tạo tài khoản thành công') });
    } catch (err) {
      return exits.fail({ code: 0, message: err });
    }
  }


};
