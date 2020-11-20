module.exports = {
  friendlyName: "Auth by phone",

  description: "Xác thực khách hàng qua số điện thoại",

  inputs: {
    token: {
      type: "string",
      required: true,
      description: "Mã token xác thực OTP",
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    try {
      let { token } = inputs;
      let phone = await sails.helpers.otp.getVerifiedOtpContent.with({
        token,
      });
      let endUserInfo = await Customer.findOne({
        where: { phone },
      });
      if (!endUserInfo){
        endUserInfo = await Customer.create({
          phone,
        }).fetch();
      }
        
      let accessToken = sails.services.crypt.signJwt(
        {
          customerId: endUserInfo.id,
          scope: "customer",
        },
        Conf.get("ACCESS_TOKEN_EXPIRE", 3000),
      );
      
      return exits.success({
        code: 0,
        message: "Thành công",
        accessToken,
        userInfo: endUserInfo,
      });
    } catch (error) {
      switch (error.code) {
        case "e_not_find_user_info":
          return exits.success({ code: 1, message: error });

        default:
          return exits.success({ code: 1, message: error });
      }
    }
  },
};
