module.exports = {
  friendlyName: "Add comment",

  description: "",

  inputs: {
    productId: { type: "number" },
    phone: { type: "string" },
    avartar: { type: "string" },
    content: { type: "string" },
    replyFor: { type: "number", defautlsTo: 0 },
  },

  exits: {},

  fn: async function (inputs,exits) {
    try {
      let { productId, content, replyFor, avatar, phone } = inputs;
      let customerId = this.req.customerId;
      let commentInfo = await Comments.addComment(productId, customerId, content, replyFor, avatar, phone);
      return exits.success({
        code :0,
        data : commentInfo
      })
    } catch (error) {
      return exits.success({
        code : 1,
        message : "Hệ thống bận, xin vui lòng thử lại sau"
      })
    }
  },
};
