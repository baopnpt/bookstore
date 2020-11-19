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
      let exchangeInfo = await Customer.getExchangeInfo(customerInfo);

      let tierInfos = Tier.getListTierInfos();
      let activeTierInfo = Tier.getTierByPoint(exchangeInfo.total);
      if (activeTierInfo.id != customerInfo.tierId) {
        customerInfo = await Customer.updateCustomerInfo(customerInfo.id, { tierId: activeTierInfo.id });
      }
      customerInfo.balance = exchangeInfo.balance;
      customerInfo.total = exchangeInfo.total;
      customerInfo.expirePoint = Conf.get('DATE_OF_POINT', 1633046399);
      let cardInfos = await Card.getCustomerCards(customerInfo.id);
      return { code: 0, message: 'Lấy thông tin thành công', customerInfo, tierInfos, cardInfos }
    } catch (error) {
      switch (error.code) {
        default:
          return { code: -1, message: 'Lỗi hệ thống', error }
      }
    }
  }
};
