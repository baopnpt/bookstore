module.exports = {


  friendlyName: 'Create verified otp',


  description: '',


  inputs: {
    content: { type: 'string', required: true },
    checkCount: { type: 'number', defaultsTo: 1 }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let { content, checkCount } = inputs;
    let token = sails.services.crypt.uuid();
    let multi = sails.services.redis.multi();
    multi.hmset(
      token,
      'checkCount',
      checkCount,
      'content',
      content
    );
    multi.expire(token, Conf.get('OTP_EXPIRE', 180));
    await new Promise((resolve, reject) => {
      multi.exec((err, replies) => {
        if (err) return reject(err);
        resolve(replies);
      });
    });
    return token;
  }


};

