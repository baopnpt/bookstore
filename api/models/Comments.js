/**
 * Comment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    productId: { type: "number" },
    customerId: { type: "number" },
    phone: { type: "string" },
    avartar: { type: "string" },
    content: { type: "string" },
    replyFor: { type: "number", defaultsTo: 0 },
  },
  getListCommentProduct: async (productId, skip, limit) => {
    let commentInfos = await Comments.find({
      where: {
        productId,
        replyFor: 0,
      },
      skip,
      limit,
      sort: "id desc",
    });
    let commentIds = commentInfos.map((i) => i.id);
    let replyInfos = await Comments.find({
      where: {
        replyFor: commentIds,
      },
      sort: "id desc",
    });
    commentInfos.forEach((e) => {
      e.replies = [];
      replyInfos.forEach((rep) => {
        if (e.id === rep.replyFor) {
          e.replies.push(rep);
        }
      });
    });
    return commentInfos;
  },
  addComment: async (
    productId,
    customerId,
    content,
    replyFor,
    avatar,
    phone
  ) => {
    let info = await Comments.create({
      productId,
      customerId,
      content,
      replyFor,
      avatar,
      phone,
    }).fetch();
    return info;
  },
};
