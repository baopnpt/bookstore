module.exports = {


  friendlyName: 'Upload comment image',


  description: 'Upload comment image',


  inputs: {
    image: { type: 'string', required: true, description: 'Định dạng ảnh base64' }
  },


  exits: {

  },


  fn: async function (inputs) {
    const size = Conf.get('MAX_IMAGE_SIZE', 10000);
    let imageSize = sails.helpers.common.getImageSize(inputs.image);
    if (imageSize.width > size) {
      return { code: 1, message: `Sai kích thước ảnh. Ảnh bình luận phải có kích thước nhỏ hơn ${size}` }
    }
    let url = await sails.helpers.common.uploadBase64Image(inputs.image);
    return { code: 0, message: 'Thành công', url };
  }
}