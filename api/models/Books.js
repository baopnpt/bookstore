/**
 * Sach.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    providerId : {type : "number"},
    publisherId : {type : "number"},
    authorId : {type : "number"},
    categoryId : {type : "number"},
    name : {type : "string"},
    price : {type : "number"},
    description : {type : "string"},
    numberOfPage : {type : "number"},
    images : {type : "json", defaultsTo : []},
    isActive : {type : "number"}
  },
  getInfoById : async (id)=>{
    let data = await Books.findOne({id});
    return data;
  }

};

