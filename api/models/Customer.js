/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: { type: 'string', maxLength: 255, defaultsTo: '' },
    phone: { type: 'string', maxLength: 100, defaultsTo: '' },
    facebookId: { type: 'string', defaultsTo: '' },
    googleId: { type: 'string', defaultsTo: '' },
    email: {
      type: 'string',
      allowNull: true
    },
    birth: { type: 'number', allowNull: true },
    gender: { type: 'string', isIn: ['male', 'female', 'other'], defaultsTo: 'male' },
    address: { type: 'string', maxLength: 255, allowNull: true },
    avatar: { type: 'string', maxLength: 255, allowNull: true },
    provinceId: { type: 'number', allowNull: true },
    districtId: { type: 'number', allowNull: true },
    wardId: { type: 'number', allowNull: true },
    levelId: { type: 'number', defaultsTo: 1 },
    password : {type  : 'number'}

  },

};

