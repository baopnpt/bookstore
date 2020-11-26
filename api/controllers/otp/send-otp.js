const flaverr = require("flaverr");

module.exports = {
  friendlyName: "Send otp",

  description: "",

  inputs: {
    phone: { type: "string", required: true },
  },

  exits: {},

  fn: async function (inputs) {
    try {
      let { phone } = inputs;
      let phoneRegex = new RegExp("[^0-9]");
      if (phoneRegex.test(phone) == true) throw flaverr("e_phone_is_fail");
      let crazyMode = Conf.get("CRAZY_MODE", false);
      let otp = "4444";
      if (!crazyMode) {
        // await sails.helpers.common.checkSpeedOtp(phone);
        otp = sails.helpers.common.generateOtp();
        Sms.sendSMS({
          phone,
          sms: `Ma OTP la ${otp}. Ma OTP chi su dung cho 1 lan dang nhap ung dung Bestbook`,
        }).then((rs) => {});
      }
      let token = await sails.helpers.otp.createOtp.with({
        checkCount: 3,
        phone,
        text: otp,
      });
      return { code: 0, message: "Gửi mã otp thành công", token: token.token };
    } catch (error) {
      switch (error.code) {
        case "e_phone_is_not_in_whitelist":
          return {
            code: 1,
            message: "Số điện thoại không nằm trong danh sách thử nghiệm",
          };
        case "e_phone_is_fail":
          return {
            code: 1,
            message: "Số điện thoại không đúng1",
          };
        default:
          return { code: -1, message: "Lỗi hệ thống" };
      }
    }
  },
};
