/**
 * Notification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // isPush: { type: "number" },
    customerId: { type: "number" },
    title: { type: "string" },
    body: { type: "string" },
    image: { type: "string", allowNull: true },
    app: { type: "string", defaultsTo: "com.mediaone.mshop" },
    data: { type: "json" },
    // isDisplay: { type: "number" },
    isRead: { type: "number" },
    type: { type: "string", isIn: ["personal", "all"], defaultsTo: "personal" },
  },
  afterCreate: async (inst, cb) => {
  },

  bootstrap: () => {
  },
};
