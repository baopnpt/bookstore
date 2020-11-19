module.exports = {
  friendlyName: "Renew token",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs,exits) {
    try {
      let customerId = this.req.customerId;
      let customerInfo = await Customer.getCustomerInfo(customerId);
      let accessToken = Customer.createToken(customerInfo.id)

      return exits.success({
        code: 0,
        message: "Thành công",
        accessToken,
        userInfo: customerInfo,
      });
    } catch (error) {
      return exits.success({
        code: 1,
        message: error,
      });
    }
  },
};
