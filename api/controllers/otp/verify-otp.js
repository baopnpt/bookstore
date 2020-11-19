module.exports = {


  friendlyName: 'Verify otp',


  description: '',


  inputs: {
    token: { type: 'string', required: true },
    otp: { type: 'string', required: true }
  },


  exits: {

  },


  fn: async function (inputs) {
    try {
      let phone = await sails.helpers.otp.checkOtp.with({
        token: inputs.token,
        text: inputs.otp
      })
      let token = await sails.helpers.otp.createVerifiedOtp.with({
        content: phone,

      })
      return { code: 0, message: 'Xác thực mã OTP thành công', token }

    } catch (error) {
      switch (error.code) {
        case 'e_maximum_check_count':
          return { code: 1, message: 'Vượt quá số lần nhập sai, vui lòng thao tác lại gửi mã OTP' }
        case 'e_invalid_otp':
          return { code: 2, message: 'Sai mã OTP' }
        default:
          console.error(error);
          return { code: -1, message: 'Lỗi hệ thống' }
      }
    }
  }


};
