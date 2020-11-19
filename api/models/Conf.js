/**
 * Conf.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let cached = {};
const path = require('path');
module.exports = {
  TYPE: {
    NUMBER: 1,
    STRING: 2
  },
  attributes: {
    keys: { type: 'string', required: true, maxLength: 255 },
    val: { type: 'string', required: true, maxLength: 1000 },
    type: { type: 'number', required: true },
    desc: { type: 'string', maxLength: 255, allowNull: true, columnName : 'description' }
  },
  afterUpdate: (inst, cb) => {
    Conf.refreshCache();
    cb();
  },
  afterCreate: (inst, cb) => {
    Conf.refreshCache();
    cb();
  },
  get: (key, _default) => {
    return cached[key] || _default;
  },
  bootstrap: async () => {
    Conf.refreshCache();
    setInterval(() => {
      Conf.refreshCache();
    }, 60000);

  },
  refreshCache: async () => {
    let data = await Conf.find();
    data.map(d => {
      switch (d.type) {
        case 1:
          cached[d.keys] = Number(d.val);
          break;
        default:
          cached[d.keys] = d.val;
          break;
      }
    })
  }
};

