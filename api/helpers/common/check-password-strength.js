module.exports = {


  friendlyName: 'Check password strength',


  description: '',


  inputs: {
    text: { type: 'string', description: 'Chuỗi mật khẩu cần kiểm tra', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },
  sync: true,

  fn: function (inputs, exits) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return exits.success(strongRegex.test(inputs.text))
  }


};

