const flaverr = require("flaverr");

module.exports = {


  friendlyName: 'Check otp',


  description: '',


  inputs: {
    token: { type: 'string', required: true },
    text: { type: 'string', required: true }
  },


  exits: {

    success: {
      description: 'Return phone if everything is ok',
    },
    invalid: {

    }
  },


  fn: async function (inputs) {
    let { token, text } = inputs;
    let multi = sails.services.redis.multi();
    multi.hincrby(token, 'checkCount', -1);
    multi.hgetall(token);
    let { checkCount, data } = await new Promise((resolve, reject) => {
      multi.exec((err, rs) => {
        if (err) return reject(err);
        resolve({
          checkCount: rs[0],
          data: rs[1]
        });
      })
    });
    if (checkCount < 0) throw flaverr('e_maximum_check_count');
    if (data.text !== text) throw flaverr('e_invalid_otp');
    return data.phone;
  }
};

