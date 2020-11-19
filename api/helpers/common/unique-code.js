const uuidv4 = require('uuid/v4');
module.exports = {


  friendlyName: 'Unique code',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },
  sync: true,

  fn: function (inputs) {
    return uuidv4();
  }


};

