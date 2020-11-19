const path = require('path');
const _ = require('lodash');
module.exports = {


  friendlyName: 'Send bulk sms',


  description: '',


  inputs: {
    file: { type: 'number', description: 'ID file excel', required: true }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      let { file } = inputs; let req = this.req;
      let fileInfo = await FileUpload.findOne({ user: this.req.user.id, id: file });
      if (!fileInfo) {new Error(Err.CODE.INVALID_UPLOAD_FILE);}
      let raw = await sails.helpers.common.parseExcelUploadFile(file);
      if (!(raw.length > 0 && raw[0].data && raw[0].data.length > 0)) {throw new Error(Err.CODE.INVALID_UPLOAD_FILE);}
      if (raw[0].data.length > Conf.get('MAX_UPLOAD_LENGTH')) {throw new Error(Err.CODE.UPLOAD_FILE_TOO_BIG);}
      let data = [];
      raw[0].data.map(d => {
        if (!d[0] || !d[1]) {return null;}
        data.push({ phone: d[0], content: d[1] });
      });
      for (var i = 0; i < data.length; i++) {
        await sails.helpers.privilege.sendSms.with(data[i]);
      }
      return exits.success({ code: 0, message: sails.__('Nhắn tin thành công') });
    } catch (err) {
      return exits.fail(sails.helpers.common.responseError(err));
    }
  }


};
