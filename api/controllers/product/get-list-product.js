module.exports = {
  friendlyName: "Get list product",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    try {
      let { skip, limit } = this.req.query;
      if(!skip) skip = 0;
      if(!limit) limit = 10;
      let data = await Books.find({
        where: {
          isActive: 1,
        },
        skip,
        limit,
      });
      return exits.success({
        code: 0,
        data,
      });
    } catch (error) {
      return exits.success({
        code: 1,
        message: JSON.stringify(error),
      });
    }
  },
};
