module.exports = {


  friendlyName: 'Inject message',


  description: '',


  inputs: {
    message: { type: 'string', description: 'Nội dung tin nhắn', required: true },
    substitute: { type: 'ref', description: 'Các thành phần nhúng' }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },
  sync: true,

  fn: function (inputs, exits) {
    let { message, substitute } = inputs;
    if (substitute) {
      for (var i in substitute) {
        message = message.replace(new RegExp(`{${i}}`, 'g'), substitute[i]);
      }
    }
    exits.success(message);
  }


};

