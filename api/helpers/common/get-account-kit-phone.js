const Accountkit = require('node-accountkit');
module.exports = {


  friendlyName: 'Lấy só điện thoại từ token account kit',


  description: '',


  inputs: {
    token: { type: 'string', description: 'Mã account kit token lấy từ client', required: true }
  },


  exits: {

    success: {
      outputFriendlyName: 'Account kit phone',
    },

  },

  fn: async function (inputs, exits) {
    let { token } = inputs;
    let phone = await new Promise((resolve, reject) => {
      //dev only
      // return resolve(token);
      Accountkit.set(Conf.get('FACEBOOK_APP_ID'), Conf.get('ACCOUNT_KIT_SECRET'), 'v1.0'); //API_VERSION is optional, default = v1.1 
      Accountkit.requireAppSecret(true); // disable app secret to authen more app
      Accountkit.getAccountInfo(token, function (err, resp) {
        if (err) return reject('invalid_accountkit_code');
        let phone = sails.helpers.common.normalizePhone(resp.phone.number);
        return resolve(phone);
      });
    });
    return exits.success(phone);
  }


};

