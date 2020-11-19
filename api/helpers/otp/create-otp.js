module.exports = {


  friendlyName: 'Create otp',


  description: '',


  inputs: {
    checkCount: {
      type: 'number',
      defaultsTo: 1,
      description: 'Number check count, checkout will be decrease everytime use check, if checkout is zero, the otp token will be destroy'
    },
    phone: {
      type: 'string'
    },
    text: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let { checkCount, phone, text = sails.services.crypt.randomOtp() } = inputs;
    let token = sails.services.crypt.uuid();
    let multi = sails.services.redis.multi();
    multi.hmset(
      token,
      'checkCount',
      checkCount,
      'text',
      text,
      'phone',
      phone
    );
    multi.expire(token, Conf.get('OTP_EXPIRE', 180));
    await new Promise((resolve, reject) => {
      multi.exec((err, replies) => {
        if (err) return reject(err);
        resolve(replies);
      });
    });
    return { token, text };
  }
};

