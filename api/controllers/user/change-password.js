const moment = require('moment');
module.exports = {
  friendlyName: 'Đổi mật khẩu tài khoản người dùng',
  type: 'backend',
  description: '',
  inputs: {
    oldPassword: { type: 'string', description: 'Mật khẩu cũ', required: true },
    newPassword: { type: 'string', description: 'Mật khẩu mới', required: true },
    confirmPassword: { type: 'string', description: 'Xác nhận mật khẩu mới', required: true },
    captcha: { type: 'string', description: 'Mã xác nhận captcha', required: true }
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
      let { oldPassword, newPassword, captcha } = inputs, req = this.req;
      let captArr = captcha.split(',');
      let captCheck = await Capt.checkCaptcha(captArr[0], captArr[1]);
      if (!captCheck) throw new Error(Err.CODE.INVALID_CAPTCHA);
      if (inputs.newPassword !== inputs.confirmPassword) throw new Error(Err.CODE.INVALID_CONFIRM_PASSWORD)
      if (!sails.helpers.common.checkPasswordStrength(newPassword)) throw new Error(Err.CODE.PASSWORD_IS_NOT_STRENGTH_ENOUGH);
      let userInfo = await Admin.findOne(req.user.id);
      if (!sails.helpers.common.checkHash.with({
        text: oldPassword,
        hash: userInfo.password
      })) throw new Error(Err.CODE.OLD_PASSWORD_INVALID);
      await Admin.update({ id: userInfo.id }).set({ password: sails.helpers.common.hash(newPassword), changePasswordAt: moment().valueOf() });
      return exits.success({ code: 0, message: sails.__('Đổi mật khẩu thành công') })
    } catch (err) {
      return exits.fail(sails.helpers.common.responseError(err));
    }
  }
};
