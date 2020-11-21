module.exports = {
  friendlyName: "Search product",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs,exits) {
    try {
      let { keyword, skip, limit } = this.req.query;
      if(!skip) skip = 0;
      if(!limit) limit = 10;
      let data = await Books.seacrhProductWithKeyword(keyword, skip, limit);
      return exits.success({
        code : 0,
        data
      });
    } catch (error) {
      return exits.success({
        code : 0,
        message : "Không tìm thấy kết quả nào.",
        data : []
      });
      
    }
  },
};
