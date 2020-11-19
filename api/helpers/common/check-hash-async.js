const bcrypt = require('bcryptjs');

module.exports = {


  friendlyName: 'Check hash',


  description: '',


  inputs: {
    text: { type: 'string', description: 'Chuỗi thường để kiểm tra', required: true },
    hash: { type: 'string', description: 'Chuỗi hash để so sánh', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs, exits) {
    let rs = await new Promise((resolve, reject) => {
      bcrypt.compare(inputs.text, inputs.hash, function (err, res) {
        if (!err) resolve(false);
        resolve(true);
      });
    });
    return exits.success(rs);
  }
};

