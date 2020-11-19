module.exports = {
  friendlyName: "Upload image",

  files: ["images"],
  type: "customer",
  description: "",

  inputs: {
    images: {
      type: "ref",
      required: true,
    },
    width: {
      type: "number",
      min: 1,
    },
    height: {
      type: "number",
      min: 1,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    let req = this.req;
    try {
      let info = await sails.upload(inputs.images);
      let fname = `${sails.services.crypt.uuid()}${info[0].name}`;
      if (info.length === 0) {
        return res.badRequest({
          message: sails.__("Không có file được upload!"),
        });
      }
      const AWS = require("aws-sdk");
      const fs = require("fs");
      const BUCKET = "m-merchant-shop";
      const spacesEndpoint = new AWS.Endpoint("sgp1.digitaloceanspaces.com");
      const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: "W42TMS5XKEQK3RQCINCN",
        secretAccessKey: "HFAma4Qt35+wE6ue57GY230U+BzuO3HbWlIbIq5Tuvg",
      });
      var params = {
        Bucket: BUCKET,
        Key: fname,
        Body: fs.readFileSync(info[0].fd),
        ACL: "public-read",
      };
      let linkImage = await new Promise((rs, rj) => {
        s3.putObject(params, function (err, data) {
          if (err) {
            console.log(err, err.stack);
            return exits.success({
              code: 3,
              message: "Upload ảnh không thành công.",
            });
          } else {
            rs(
              s3.getSignedUrl("getObject", {
                Bucket: BUCKET,
                Key: fname,
              })
            );
          }
        });
      });
      linkImage = linkImage.substring(linkImage.indexOf("?"), 0);
      let fileUploadTmp = {
        user: req.user.id,
        fileName: fname,
        serverFileDir: "",
        serverFileName: "images",
        fileType: info[0].fileType,
        size: info[0].size,
        status: info[0].status,
        field: info[0].field,
      };
      let filesCreate = [];
      let filesNotCreate = [];
      // let fileCreated = await FileUpload.create(fileUploadTmp).fetch();

      filesCreate.push(fileUploadTmp);
      filesCreate[0].url = linkImage;
      return exits.success({
        created: filesCreate,
        notCreated: filesNotCreate,
      });
    } catch (error) {
      return this.res.serverError({
        message: sails.__("500"),
        error: String(error),
      });
    }
  },
};
