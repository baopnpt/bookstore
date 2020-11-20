/**
 * Banner.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    image: { type: 'string', required: true },
    isActive: { type: 'boolean', required: true },
    action: { type: 'string', isIn: ['productInfo', 'openUrl'] },
    actionData: { type: 'string' },
    sequence: { type: 'number' },
  },
  getAllBanners : async ()=>{
    let key = "ALL_BANNER";
    let data = await sails.services.redis.getParse(key);
    if(!data){
      data = await Banner.find({
        isActive : 1
      });
      await sails.services.redis.setExpire(key,data,Conf.get("ALL_BANNEr_CACHE",300));
    }
    return data;
  }
};

