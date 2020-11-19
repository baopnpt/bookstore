module.exports = {
  friendlyName: 'Get query string',

  description: '',

  inputs: {
    opts: { type: 'ref' },
  },

  exits: {
    success: {
      outputFriendlyName: 'Query string',
    },
  },

  fn: async function(inputs) {
    let {opts} = inputs;
    let str = [];
    for (const p in opts) {
      if (opts.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(opts[p])}`);
      }
    }
    return str.join('&');
  },
};
