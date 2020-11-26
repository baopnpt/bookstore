var download = require('download-file'), pathUtils = require('path');
module.exports = {


  friendlyName: 'Download image',


  description: '',


  inputs: {
    phone : {type : "string"}
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync : true,
  fn: function (inputs,exits) {
      let {phone} = inputs;
    if (phone[0] != "0") phone = `84${phone}`;
  else phone = "84" + phone.substring(1);
  return exits.success(phone);
  }
};

