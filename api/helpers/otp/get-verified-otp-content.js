const flaverr = require("flaverr");

module.exports = {


  friendlyName: 'Get verified otp content',


  description: '',


  inputs: {
    token: { type: 'string', required: true }
  },


  exits: {

    success: {
      outputFriendlyName: 'Verified otp content',
    },
    invalidToken: {

    }
  },


  fn: async function (inputs) {
    let { token } = inputs;
    let multi = sails.services.redis.multi();
    multi.hgetall(token);
    multi.del(token);
    let replies = await new Promise((resolve, reject) => {
      multi.exec((err, replies) => {
        if (err) return reject(err);
        resolve(replies);
      });
    });
    let data = replies[0];
    if (!data) throw flaverr('e_invalid_token');
    return data.content;
  }


};

