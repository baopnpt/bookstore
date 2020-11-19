const jwt = require('jsonwebtoken'), moment = require('moment');

module.exports = {


  friendlyName: 'Verify',


  description: 'Verify jwt.',


  inputs: {
    token: { type: 'string', description: 'Token cần kiểm tra', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function (inputs, exits) {
    let { token } = inputs;
    try {
      let decoded = jwt.verify(token, Conf.get('JWT_SECRET'));
      if (!decoded) throw new Error(Err.CODE.TOKEN_EXPIRED)
      return exits.success(decoded);
    } catch (err) {
      throw new Error(Err.CODE.TOKEN_EXPIRED)
    }
  }
};

