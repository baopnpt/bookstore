// const path = require("path");
// const fs = require("fs");
// function moveFile(oldPath, newPath) {
//   return new Promise((resolve, reject) => {
//     fs.rename(oldPath, newPath, err => {
//       if (err) {
//         // console.log('reject');
//         return reject(err);
//       }
//       // console.log('resolve');

//       return resolve();
//     });
//   });
// }

module.exports = {
  friendlyName: "Upload image",

  files: ["files"],

  description: "",

  inputs: {
    files: {
      type: "ref",
      required: true
    }
  },

  exits: {
    success: {
      statusCode: 200
    },
    fail: {
      statusCode: 400
    }
  },

  fn: async function (inputs, exits) {
//     try {
//       let info = await sails.upload(inputs.files);
//       let fname = `${sails.services.crypt.uuid()}${info[0].name}`;
//       if (info.length === 0) {
//         return res.badRequest({
//           message: sails.__("Không có file được upload!")
//         });
//       }
//       let data;
//       const GOOGLE_CLOUD_PROJECT_ID = "mediaone-thp"; // Replace with your project ID
//       const GOOGLE_CLOUD_KEYFILE = "./account_service.json"; // Replace with the path to the downloaded private key
//       const storage = new Storage({
//         projectId: GOOGLE_CLOUD_PROJECT_ID,
//         keyFilename: GOOGLE_CLOUD_KEYFILE
//       });
//       try {
//         data = await storage.bucket("mega-gcs-thp").upload(info[0].fd, {
//           gzip: true,
//           destination: fname,
//           metadata: {
//             cacheControl: "public, max-age=31536000"
//           }
//         });
//       } catch (error) { }
//       let fileUploadTmp = {
//         user: this.req.user.id,
//         fileName: fname,
//         serverFileDir: "",
//         serverFileName: "files",
//         fileType: info[0].fileType,
//         size: info[0].size,
//         status: info[0].status,
//         field: info[0].field,
//         url: data[1].mediaLink,
//         fullUrl: data[1].mediaLink
//       };
//       let filesCreate = [];
//       let filesNotCreate = [];
//       let created = await FileUpload.create(fileUploadTmp).fetch();
//       filesCreate.push(created);
//       filesCreate[0].url = data[1].mediaLink;
//       filesCreate[0].fullUrl = data[1].mediaLink;

//       // for (let i = 0; i < info.length; i++) {
//       //   const v = info[i];
//       //   let tmp = Object.assign({}, fileUploadTmp);
//       //   tmp.fileName = v.filename;
//       //   tmp.serverFileName = path.basename(v.fd);
//       //   tmp.serverFileDir = 'files';
//       //   tmp.size = v.size;
//       //   tmp.fileType = v.type;
//       //   tmp.status = v.status;
//       //   tmp.field = v.field;
//       //   tmp.fullUrl = `http://${sails.config.serverIP}:${sails.config.port}/files/${path.basename(v.fd)}`
//       //   tmp[`server${sails.config.serverID}`] = true;
//       //   try {
//       //     await moveFile(v.fd, FileUpload.getFilePath(tmp));
//       //     filesCreate.push(tmp);
//       //   } catch (error) {
//       //     fs.unlinkSync(v.fd);
//       //     filesNotCreate.push({
//       //       filename: v.filename,
//       //       error: String(error)
//       //     });
//       //   }
//       // }
//       // let created = await FileUpload.createEach(filesCreate).fetch();

//       return exits.success({
//         created: filesCreate,
//         notCreate: filesNotCreate
//       });
//     } catch (err) {
//       return exits.fail(err);
//     }
  }
};
