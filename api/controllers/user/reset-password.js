const moment = require('moment');
module.exports = {


  friendlyName: 'Quản trị đặt lại mật khẩu cho người dùng',


  description: '',


  inputs: {
    user: { type: 'number', description: 'ID người dùng', required: true },
    password: { type: 'string', description: 'Mật khẩu mới', required: true },
    confirmPassword: { type: 'string', description: 'Mật khẩu mới', required: true },
    captcha: { type: 'string', description: 'Mã captcha xác nhận', required: true }
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
      let { password, user, captcha } = inputs;
      let captArr = captcha.split(',');
      let captCheck = await Capt.checkCaptcha(captArr[0], captArr[1]);
      if (!captCheck) throw new Error(Err.CODE.INVALID_CAPTCHA);
      if (inputs.password !== inputs.confirmPassword) throw new Error(Err.CODE.INVALID_CONFIRM_PASSWORD);
      if (!sails.helpers.common.checkPasswordStrength(password)) throw new Error(Err.CODE.PASSWORD_IS_NOT_STRENGTH_ENOUGH);
      await Admin.update({ id: user }).set({ password: sails.helpers.common.hash(password), changePasswordAt: moment().valueOf() });
      return exits.success({ code: 0, message: sails.__('Đổi mật khẩu thành công') })
    } catch (err) {
      return exits.fail(sails.helpers.common.responseError(err));
    }
  }
};
