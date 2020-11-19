const crypto = require('crypto');
module.exports = {


  friendlyName: 'Encrypthmacs',


  description: 'Encrypthmacs common.',


  inputs: {
    key: { type: 'string' },
    str: { type: 'string' },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs) {
    let { key, str } = inputs;
    return crypto
      .createHmac('sha1', key)
      .update(str)
      .digest('base64');
  }


};

