const jwt = require('jsonwebtoken'), moment = require('moment');

module.exports = {


  friendlyName: 'Sign',


  description: 'Sign jwt.',


  inputs: {
    user: { type: 'ref', description: 'Thông tin người dùng', required: true },
    time: { type: 'number', description: 'Thời gian hết hạn. Đơn vị milisecond', defaultsTo: 300000 }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function (inputs, exits) {
    let { user, time } = inputs;
    delete user.exp;
    delete user.iat;
    let token = jwt.sign(user, Conf.get('JWT_SECRET'), { expiresIn: time });
    exits.success(token);
  }
};

