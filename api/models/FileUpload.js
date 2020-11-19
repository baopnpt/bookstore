/**
 * FileUpload.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const path = require('path');

module.exports = {

  attributes: {
    fileName: {
      type: 'string',
    },
    serverFileDir: {
      type: 'string',
    },
    serverFileName: {
      type: 'string',
    },
    fileType: {
      type: 'string',
    },
    size: {
      type: 'number',
    },
    status: {
      type: 'string'
    },
    field: {
      type: 'string'
    },
    user: { type : 'number' },
    url: { type: 'string' },
    fullUrl: { type: 'string' },
    server1: { type: 'boolean', defaultsTo: false },
    server2: { type: 'boolean', defaultsTo: false }
  },
  syncImages: async () => {

  },
  beforeCreate: async (instance, cb) => {
    instance.url = `${Conf.get('BASE_URL')}/${instance.serverFileDir}/${instance.serverFileName}`;
    cb();
  },
  dir: {
    images: path.join(__dirname, '../assets/images'),
    other: path.join(__dirname, '../../upload/files'),
    files: path.join(__dirname, '../../upload/files'),
    private: path.join(__dirname, '../../upload/files'),
    upload: path.join(__dirname, '../../upload'),
  },
  getFilePath: function (fileUpload) {
    let filePath = path.join(FileUpload.dir[fileUpload.serverFileDir], fileUpload.serverFileName);
    return filePath;
  },
  isImage: function (fileUpload) {
    if (fileUpload && fileUpload.fileType) {
      return fileUpload.fileType.toLowerCase().includes('image');
    } else {
      return false;
    }
  },
  getLinkImage: function (fileUpload) {
    if (!FileUpload.isImage(fileUpload)) {
      return {
        status: false,
        url: ''
      };
    }
    return {
      status: true,
      url: `${Conf.get('BASE_URL')}/${fileUpload.serverFileDir}/${fileUpload.serverFileName}`
    };
  },
  customToJSON: function () {
    let link = FileUpload.getLinkImage(this);
    if (link.status && this.serverFileDir === 'images') {
      this.url = link.url;
    }
    return this;
  },

  bootstrap: async () => {
  }
};
