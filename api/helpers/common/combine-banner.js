
let logosize = [80, 80],
  logopos = [470, 10],
  decorsize = [150, 150]
const path = require('path');
const jimp = require('jimp');
module.exports = {

  friendlyName: 'Combine banner',
  description: '',
  inputs: {
    // bannerUrl: { type: 'string', description: 'Url của banner', required: true },
    // logoUrl: { type: 'string', description: 'Url logo', required: true },
    // dest: { type: 'string', description: 'Đường dẫn tới file output', required: true }
    id: { type: 'number', description: 'ID voucher dự bị', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {
      let { id } = inputs;
      let voucherInfo = await ReserveVoucher.findOne(id);
      let partnerInfo = await ReservePartner.findOne(voucherInfo.partner);
      let bannerUrl = voucherInfo.images[0];
      logoUrl = partnerInfo.logo;
      let fileName = sails.helpers.common.uniqueCode() + '.jpg';
      let dest = path.join(FileUpload.dir.images, fileName);
      let bannerPath = 'banner.jpg', logoPath = 'logo.jpg';
      await sails.helpers.common.downloadImage(bannerUrl, bannerPath);
      await sails.helpers.common.downloadImage(logoUrl, logoPath);
      const logo = await jimp.read(logoPath);
      logo.resize(logosize[0], logosize[1], jimp.RESIZE_BEZIER)
      const mask = await jimp.read(path.join(__dirname, '../../../config/images', 'mask.jpg'));
      mask.resize(logosize[0], logosize[1], jimp.RESIZE_BEZIER)
      logo.mask(mask);
      const banner = await jimp.read(bannerPath);
      // let decor = await jimp.read(path.join(__dirname, '../../../config/images', 'decor.png'));
      // decor.resize(decorsize[0], decorsize[1], jimp.RESIZE_BEZIER)
      // banner.composite(decor, logopos[0] - (decorsize[0] - logosize[0]) / 2, logopos[1] - (decorsize[1] - logosize[1]) / 2, [jimp.BLEND_DESTINATION_OVER]);
      banner.composite(logo, logopos[0], logopos[1], [jimp.BLEND_DESTINATION_OVER]);
      banner.write(dest);
      await ReserveVoucher.update({ id: voucherInfo.id }).set({ images: [`${Conf.get('BASE_URL')}/images/${fileName}`] });
    } catch (err) {
      console.log('Không thể gộp hình ảnh');
    }
  }
};

