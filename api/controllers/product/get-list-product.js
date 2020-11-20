module.exports = {
  friendlyName: "Get list product",

  description: "",

  inputs: {
    skip: { type: "number", required: true },
    limit: { type: "number", required: true },
  },

  exits: {},

  fn: async function (inputs, exits) {
    try {
      let { skip, limit } = inputs;
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
