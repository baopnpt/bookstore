module.exports = {


  friendlyName: 'Upload avatar',


  description: '',


  inputs: {
    image: { type: 'string', required: true }
  },


  exits: {

  },


  fn: async function (inputs) {
    const size = Conf.get('AVATAR_SIZE', 200);
    let imageSize = sails.helpers.common.getImageSize(inputs.image);
    if (imageSize.width !== size || imageSize.height !== size) {
      return { code: 1, message: 'Sai kích thước ảnh. Kích thước đúng là 200x200' }
    }
    let url = await sails.helpers.common.uploadBase64Image(inputs.image);
    return { code: 0, message: 'Thành công', url };
  }
}