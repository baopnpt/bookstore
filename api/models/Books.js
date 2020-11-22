/**
 * Sach.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    providerId: { type: "number" },
    publisherId: { type: "number" },
    authorId: { type: "number" },
    categoryId: { type: "number" },
    name: { type: "string" },
    price: { type: "number" },
    percentDiscount: { type: "number" },
    description: { type: "string" },
    numberOfPage: { type: "number" },
    images: { type: "json", defaultsTo: [] },
    isActive: { type: "number" },
    nameAlias : {type : "string", allowNull : true}
  },
  afterCreate : (inst, cb)=>{
    let nameAl = sails.helpers.common.removeAlias(inst.name);
    Books.update(inst.id).set({nameAlias : nameAl}).then(()=>{});
    cb();
  },
  afterUpdate : (inst, cb)=>{
    let nameAl = sails.helpers.common.removeAlias(inst.name);
    Books.update(inst.id).set({nameAlias : nameAl}).then(()=>{});
    cb();
  },
  getInfoById: async (id) => {
    let data = await Books.findOne({ id });
    return data;
  },
  seacrhProductWithKeyword: async (keyword, skip, limit) => {
    let data = await Books.find({
      where: {
        nameAlias: {
          contains: keyword,
        },
      },
      skip,
      limit,
    });
    return data
  },
  getProductWithIds : async (productIds)=>{
    let data = await Books.find({
      id : productIds
    });
    return data;
  }
};
