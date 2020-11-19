module.exports = {


  friendlyName: 'Sinh chuỗi ngẫu nhiên',


  description: '',


  inputs: {
    size: { type: 'number', description: 'Độ dài chuỗi cần sinh', required: true },
    stringOnly: { type: 'boolean', description: 'Chỉ sinh chuỗi kí tự' },
    numberOnly: { type: 'boolean', description: 'Chỉ sinh chuỗi số' }
  },


  exits: {

    success: {
      description: 'Trả về chuỗi ngẫu nhiên',
    },

  },
  sync: true,

  fn: function (inputs) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (inputs.stringOnly) {
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    };
    if (inputs.numberOnly) {
      possible = '0123456789';
    }
    for (var i = 0; i < inputs.size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
};

