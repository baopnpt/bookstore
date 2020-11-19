var download = require('download-file'), pathUtils = require('path');
module.exports = {


  friendlyName: 'Download image',


  description: '',


  inputs: {
    url: { type: 'string', description: 'url ảnh', required: true },
    path: { type: 'string', description: 'Đường dẫn lưu file', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    let { url, path } = inputs;
    var options = {
      directory: pathUtils.dirname(path),
      filename: pathUtils.basename(path)
    }
    await new Promise((resolve, reject) => {
      download(url, options, function (err) {
        if (err) return reject();
        resolve();
      })
    });
  }
};

