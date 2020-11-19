module.exports = {


  friendlyName: 'Logout',

  type: 'backend',
  description: 'Đăng xuất người dùng',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200
    }
  },


  fn: async function (inputs, exits) {
    return exits.success({ code: 0, message: sails.__('Đăng xuất thành công') });
  }
};
