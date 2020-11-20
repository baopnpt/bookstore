module.exports = {
  friendlyName: "Get product info",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs,exits) {
    try {
      let {id} = this.req.query;
      if(!id) {
        return exits.success({
          code : 1,
          message : "Vui lòng truyền thông mã sản phẩm"
        })
      };
      let productInfo = await Books.getInfoById(id);
      return exits.success({
        code : 0,
        data : productInfo,
        message : "Thành công"
      })

    } catch (error) {
      return exits.success({
        code : 1,
        data : "Hệ thống lỗi, vui lòng thử lại sau."
      })
    }
  },
};
