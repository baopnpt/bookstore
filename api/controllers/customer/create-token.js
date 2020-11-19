module.exports = {
  docgen: true,
  friendlyName: 'Create token',


  description: '',


  inputs: {
    customerInfo: { type: 'ref', required: true, description: 'Nội dung customer info megaone ' }
  },


  exits: {
    success: {
      response: [
        { key: 'code', type: 'number', description: 'Mã lỗi' },
        { key: 'message', type: 'string', description: 'Mô tả kết quả' },
        { key: 'token', type: 'string', description: 'Chuỗi token phiên làm việc' }
      ],
      outputExample: `{
        "code": 0,
        "message": "Đăng nhập thành công",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImN1c3RvbWVySWQiOjF9LCJpYXQiOjE1OTU1NjY3MzgsImV4cCI6MTU5NTY1MzEzOH0.Z155v4pN_Sm-Zood9aGTKsdpfSLN6xzy95yeAKd9WL8"
      }`
    }
  },


  fn: async function (inputs) {
    let customerInfo = inputs.customerInfo;
    customerInfo.provinceId = customerInfo.province;
    customerInfo.districtId = customerInfo.district;
    customerInfo.wardId = customerInfo.ward;
    try {
      let customerExists = await Customer.checkCustomerExists(customerInfo.id);
      if (!customerExists) throw 'user_not_found'
    } catch (error) {
      await Customer.createCustomer(customerInfo);
    }
    let token = Customer.createToken(customerInfo.id);
    return { code: 0, message: 'Đăng nhập thành công', token }
  }


};
