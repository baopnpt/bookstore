module.exports = {
  friendlyName: "Get list product by category",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs,exits) {
    try {
      let { categoryId, skip, limit } = this.req.query;
      if(!skip) skip = 0;
      if(!limit) limit = 5;
      if(!categoryId){
        return exits.success({
          code : 1,
          message : "Vui lòng truyền categoryId"
        })
      };
      let data = await Books.find({
        where :{
          categoryId,
          isActive : 1
        },
        skip,
        limit,
        sort : "createdAt desc"
      });
      return exits.success({
        code : 0,
        data,
        message : "Thành công"
      })
    } catch (error) {
      return exits.success({
        code :1,
        message : "Hệ thống đang bận xin vui lòng thử lại!"
      })
    }
  },
};
