module.exports = {


  friendlyName: 'Update customer info',


  description: '',


  inputs: {
    info: { type: 'ref' }
  },


  exits: {

  },


  fn: async function (inputs) {
    let allowFields = ['name', 'phone', 'email', 'birth', 'gender', 'address', 'avatar', 'provinceId', 'districtId', 'wardId']
    let updateInfo = {};
    let customerInfo = await Customer.getCustomerInfo(this.req.customerId);
    for (var i in inputs.info) {
      if (!inputs.info[i]) continue;
      if (allowFields.includes(i)) {
        updateInfo[i] = inputs.info[i];
      }
    }
    customerInfo = await Customer.updateCustomerInfo(this.req.customerId, updateInfo);
    return { code: 0, customerInfo, message: 'Cập nhật thông tin thành công' };
  }
};
