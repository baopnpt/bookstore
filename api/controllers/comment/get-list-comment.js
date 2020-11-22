module.exports = {
  friendlyName: "Get list comment",

  description: "",

  inputs: {
    
  },

  exits: {},

  fn: async function (inputs, exits) {
    try {
      let { skip, limit, productId } = this.req.query;
      if (!skip) skip = 0;
      if (!limit) limit = 10;
      if(!productId) {
        return exits.success({
          code : 1,
          message : "Vui lòng truyền id sản phẩm"
        })
      }
      let data = await Comments.getListCommentProduct(productId,skip,limit);
      return exits.success({
        code : 0,
        data
      })
    } catch (error) {
      return exits.success({
        code : 1,
        message : "Hệ thống bận xin vui lòng thử lại sau."
      })
    }
  },
};
