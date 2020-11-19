const moment = require('moment');
module.exports = {


  friendlyName: 'Đăng nhập quản trị',


  description: 'Đăng nhập hệ thống bằng tài khoản và mật khẩu',


  inputs: {
    username: { type: 'string', required: true, description: 'Tên đăng nhập' },
    password: { type: 'string', required: true, description: 'Mật khẩu đăng nhập' },
    // captchaId: { type: 'number', description: 'Id của captcha', required: true },
    // captchaText: { type: 'string', description: 'Mã captcha', required: true },
    // accountKitToken: { type: 'string', description: 'Mã xác thực account kit token đảm bảo xác thực đa nhân tố' }
  },


  exits: {
    success: {
      statusCode: 200,
      outputExample: `{
        "code": 0,
        "message": "Thành công",
        "data": {
            "userInfo": {
                "createdAt": 1550562002478,
                "updatedAt": 1550562002478,
                "id": 1,
                "name": "Kỹ thuật",
                "phone": "0961105256",
                "email": "tungdt2504@gmail.com",
                "identification": "123456",
                "gender": 1,
                "address": "Hà Nội",
                "point": 0,
                "username": "root",
                "role": 1,
                "group": null
            },
            "token": "4b5b3408-0171-413f-bbfd-58a38fd1c9de",
            "expiredAt": 1550563406451,
            "timeToLive": 15
        }
    }`
    },
    fail: {
      statusCode: 400
    }
  },


  fn: async function (inputs, exits) {
    try {
      let { username, password, captchaId, captchaText, accountKitToken } = inputs;

      let userInfo = await Admin.findOne({ username: username });
      if (!userInfo) throw "Tên đăng nhập hoặc mật khẩu không đúng.";

      if (!sails.helpers.common.checkHash.with({
        text: password,
        hash: userInfo.password
      })) throw "Tên đăng nhập hoặc mật khẩu không đúng.";
      //create token
      delete userInfo.password;
      let token = sails.helpers.jwt.sign.with({
        user: {
          id: userInfo.id,
          role: userInfo.role,
          partner: userInfo.partner
        },
        time: Conf.get('TOKEN_EXPIRE')
      })
      return exits.success({
        code: 0,
        message: sails.__('Thành công'),
        data: {
          userInfo: userInfo,
          token,
          expiredAt: moment().add(Conf.get('TOKEN_EXPIRE'), 'hours').valueOf()
        }
      })
    } catch (err) {
      return exits.fail({
        code : 1,
        message : err
      });
    }
  }
};
