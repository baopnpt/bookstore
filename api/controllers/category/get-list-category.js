module.exports = {
  friendlyName: "Get list category",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs,exits) {
    try {
      let data = await Category.getAllCategory();
      return exits.success({
        code : 0,
        message : "Thành công",
        data
      })
    } catch (error) {}
  },
};
