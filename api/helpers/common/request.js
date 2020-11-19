const request = require('request');
module.exports = {
  friendlyName: 'Request',

  description: 'Gọi các hàm http request',

  inputs: {
    options: {
      type: 'ref',
      description: 'Định nghĩa các thông tin gửi request',
      example: `{
      uri: 'http://google.com.vn',
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({name: 'Walter'})
  }`,
    },
  },

  exits: {
    success: {
      description: 'Dữ liệu từ http request',
    },
  },

  fn: async function(inputs, exits) {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    let { options } = inputs;
    let rs = await new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        try {
          body = JSON.parse(body);
          if (response.statusCode === 200) {
            resolve(body);
          } else {
            reject(body);
          }
        } catch (err) {
          reject(body);
        }
      });
    });
    return exits.success(rs);
  },
};
