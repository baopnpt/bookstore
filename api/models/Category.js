/**
 * The_loai.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string" },
    image : {type : "string"},
    orderIndex : {type : "string"},
    isActive : {type  :"number", defaultsTo : 0}
  },
  getAllCategory : async ()=>{
    let key = "ALL_CATEGORY";
    let data = await sails.services.redis.getParse(key);
    if(!data){
      data = await Category.find({
        isActive : 1
      });
      await sails.services.redis.setExpire(key,data,Conf.get("ALL_CATEGORYG_CACHE",300));
    }
    return data;
  }
};
