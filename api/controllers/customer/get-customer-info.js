module.exports = {
  docgen: true,

  friendlyName: 'Get customer info',


  description: '',


  inputs: {
  },


  exits: {
  },


  fn: async function (inputs) {
    try {
      let customerInfo = await Customer.getCustomerInfo(this.req.customerId);
      return { code: 0, message: 'Lấy thông tin thành công', customerInfo }
    } catch (error) {
      switch (error.code) {
        default:
          return { code: -1, message: 'Lỗi hệ thống', error }
      }
    }
  }
};
