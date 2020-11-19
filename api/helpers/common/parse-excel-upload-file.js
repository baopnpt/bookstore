const path = require('path');
const xlsx = require('node-xlsx');
module.exports = {


  friendlyName: 'Get excel upload file',


  description: '',


  inputs: {
    file: { type: 'number', description: 'ID file upload', required: true }
  },


  exits: {

    success: {
      outputFriendlyName: 'Excel upload file',
    },

  },

  fn: async function (inputs) {
    let { file } = inputs;
    let fileUploadInfo = await FileUpload.findOne(file);
    if (!fileUploadInfo) throw new Error(Err.CODE.INVALID_UPLOAD_FILE);
    if (!fileUploadInfo[`server${sails.config.serverID}`]) {
      //download file if not exits in our server
      await sails.helpers.common.downloadFile.with({
        url: fileUploadInfo.fullUrl,
        path: path.join(FileUpload.dir.upload, fileUploadInfo.serverFileDir, fileUploadInfo.serverFileName)
      })
      await FileUpload.update({ id: fileUploadInfo.id }).set({ [`server${sails.config.serverID}`]: true })
    }
    let raw = null;
    try {
      raw = xlsx.parse(path.join(FileUpload.dir.upload, fileUploadInfo.serverFileDir, fileUploadInfo.serverFileName));
    } catch (err) {
      throw new Error(Err.CODE.INVALID_UPLOAD_FILE);
    }
    return raw;
  }
};

