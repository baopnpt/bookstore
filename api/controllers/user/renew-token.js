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
    let token = sails.helpers.jwt.sign.with({
      user: this.req.user,
      time: Conf.get('TOKEN_EXPIRE')
    })
    return exits.success({ code: 0, token });
  }
};
