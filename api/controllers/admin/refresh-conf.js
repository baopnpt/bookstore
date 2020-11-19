module.exports = {


  friendlyName: 'Refresh conf',


  description: 'Tải lại dữ liệu cấu hình hệ thống từ csdl',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      await Conf.refreshCache();
      return exits.success({ code: 0, message: sails.__('Cấu hình thành công') });
    } catch (err) {
      return exits.fail();
    }
  }


};
