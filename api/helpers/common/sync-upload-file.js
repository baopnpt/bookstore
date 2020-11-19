const path = require('path'), fs = require('fs'), _ = require('lodash');
module.exports = {


  friendlyName: 'Sync upload file',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {
      let folder = 'images';
      let localFiles = await new Promise((resolve, reject) => {
        fs.readdir(path.join(FileUpload.dir.upload, folder), function (err, files) {
          resolve(files);
        });
      });
      let remoteFilesInfo = await ServerSync.find({ folder });
      let remoteFiles = remoteFilesInfo.map(f => f.fName);
      let filesToPush = _.difference(localFiles, remoteFiles);
      let filesToPull = [];
      remoteFilesInfo.map(f => {
        if (!_.includes(localFiles, f.fName)) filesToPull.push(f);
      });
      //pushing files
      if (filesToPush.length > 0) {
        let fileCreateInfos = filesToPush.map(f => {
          return {
            folder,
            fName: f,
            url: `http://${sails.config.serverIP}:${sails.config.port}/${folder}/${f}`
          }
        });
        await ServerSync.createEach(fileCreateInfos);
      }
      //pulling files
      for (let i = 0; i < filesToPull.length; i++) {
        let fInfo = filesToPull[i];
        try {
          await sails.helpers.common.downloadFile.with({
            url: fInfo.url,
            path: path.join(FileUpload.dir.upload, folder, fInfo.fName)
          })
        } catch (err) {
          // sails.log.debug(`Không tải được file upload ${fInfo.url}`);
        }
      }
    } catch (err) {

    }
  }
};

