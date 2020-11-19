module.exports = {


  friendlyName: 'Match word',


  description: '',


  inputs: {
    key: { type: 'string', description: 'Từ khóa' },
    word: { type: 'string', description: 'Chuỗi cần tìm kiếm' }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function (inputs) {
    let { key, word } = inputs;
    if (!key) return true;
    if (!word) return false;
    key = sails.helpers.common.removeAlias(key).toUpperCase();
    word = sails.helpers.common.removeAlias(word).toUpperCase();
    return word.indexOf(key) != -1;
  }


};

