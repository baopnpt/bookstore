/**
 * Menu.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true, maxLength: 255 },
    url: { type: 'string', maxLength: 255 },
    icon: { type: 'string', maxLength: 255 },
    roles: { type: 'json', columnType: 'text', defaultsTo: [] },
    parent: { type: 'number' },
    isParent: { type: 'boolean', defaultsTo: false }
  },

};

