module.exports = {


  friendlyName: 'Download file',


  description: '',


  inputs: {
    fileId: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var file = await FileUpload.findOne({
      id: inputs.fileId
    });
    if (!file) {
      return this.res.notFound({
        message: sails.__('File không tồn tại!')
      });
    }

    this.res.attachment(file.fileName);
    var downloading = await sails.startDownload(FileUpload.getFilePath(file));
    return exits.success(downloading);
  }


};
