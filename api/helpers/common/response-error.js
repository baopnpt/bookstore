module.exports = {
  friendlyName: 'Convert lỗi dạng json để trả về',

  description: 'Convert lỗi dạng json để trả về',

  inputs: {
    error: { type: 'ref', description: 'Đối tượng lỗi' },
  },

  sync: true,
  exits: {
    success: {
      outputFriendlyName: 'Error object',
    },
  },

  fn: function(inputs, exits) {
    if (inputs.error instanceof Error) {
      let code = Number(inputs.error.message);
      if (isNaN(code)) {
        return exits.success(inputs.error);
      }
      let rs = { code, message: sails.__(`ERROR_CODE_${code}`) };
      if (sails.config.debug) {
        rs.debugInfo = inputs.error;
      }
      return exits.success(rs);
    }
    return exits.success(inputs.error);
  },
};
