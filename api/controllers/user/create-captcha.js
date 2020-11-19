const svgCaptcha = require('svg-captcha');
module.exports = {


  friendlyName: 'Tạo một mã captcha mới',
  type: 'backend',

  description: '',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200
    }
  },


  fn: async function (inputs, exits) {
    try {
      var data = svgCaptcha.create({ background: '#cc9966', noise: 2, ignoreChars: '0o1i', charPreset: '0123456789' });
      //create capt
      let captInfo = await Capt.create({ text: data.text }).fetch();
      return exits.success({ code: 0, message: sails.__('Thành công'), data: data.data, id: captInfo.id })
    } catch (err) {
      return exits.error(err);
    }
  }
};
