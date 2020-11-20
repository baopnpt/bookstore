module.exports = {


  friendlyName: 'Get list banner',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    try {
      let data = await Banner.getAllBanners();
      return exits.success({
        code : 0,
        message : "Thành công",
        data
      })
    } catch (error) {
      return exits.success({
        code : 1,
        message : "Thành công",
        data : []
      })
    }
  }


};
