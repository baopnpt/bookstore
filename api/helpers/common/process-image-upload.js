const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const replaceExt = require('replace-ext');
module.exports = {


  friendlyName: 'Upload image',
  type: 'customer',
  description: '',


  inputs: {
    images: {
      type: 'ref',
      required: true
    },
    width: {
      type: 'number',
      min: 1
    },
    height: {
      type: 'number',
      min: 1
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    try {
      let w = inputs.width;
      let h = inputs.height;
      let info = await sails.upload(inputs.images);
      if (info.length === 0) {
        throw 'Không thể upload ảnh';
      }
      let filesCreate = [];
      let filesNotCreate = [];

      for (let i = 0; i < info.length; i++) {
        const v = info[i];
        let tmp = {
          fileName: v.filename,
          serverFileName: path.basename(v.fd),
          serverFileDir: 'images',
          size: v.size,
          fileType: v.type,
          status: v.status,
          field: v.field
        }

        if (FileUpload.isImage(tmp)) {
          // let tempPromise = sharp(v.fd).resize({ withoutEnlargement: true });
          if (w && h) {
            Object.assign(tmp, {
              serverFileName: replaceExt(tmp.serverFileName, '.jpg'),
              fileName: replaceExt(tmp.fileName, '.jpg'),
              fileType: 'image/jpeg'
            });
            w = Number(w);
            h = Number(h);
            await sharp(v.fd)
              .resize(w, h, {
                withoutEnlargement: false,
                kernel: sharp.kernel.lanczos2,
                // interpolator: sharp.interpolator.nohalo
              })
              .jpeg()
              .toFile(path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName));
          } else {
            //move file only
            await sails.helpers.common.moveFile.with({
              oldPath: v.fd,
              newPath: path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName)
            })
          }
          // await tempPromise.toFile(path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName));
          filesCreate.push(tmp);
        } else {
          let notCreate = {
            fileName: tmp.fileName,
            error: 'File không phải định dạng hình ảnh'
          };
          filesNotCreate.push(notCreate);
        }
        // fs.unlinkSync(v.fd);
      }
      let created = await FileUpload.createEach(filesCreate).fetch();

      return exits.success({
        created,
        notCreate: filesNotCreate
      });
    } catch (error) {
      throw error;
    }

  }


};
