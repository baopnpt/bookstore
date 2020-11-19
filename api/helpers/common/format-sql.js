const mysql = require('mysql');
module.exports = {


  friendlyName: 'Format sql',


  description: '',


  inputs: {
    query: { type: 'string', description: 'Chuỗi query' },
    params: { type: 'ref', description: 'Tham số' }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },
  sync: true,

  fn: function (inputs, exits) {
    return exits.success(mysql.format(inputs.query, inputs.params));
  }
};

