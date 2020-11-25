/**
 * Nha_cung_cap.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string" },
    address: { type: "string", allowNull : true },
    phone: { type: "string" , allowNull : true},
  },
};
