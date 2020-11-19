module.exports = {
  friendlyName: 'Gen unique string',

  description: '',

  inputs: {
    stringLength: { type: 'number' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },
  sync: true,
  fn: function (inputs) {
    return 1;
  },
};
