module.exports = {
  friendlyName: 'Đổi tất cả số điện thoại về định dạng 84',
  description: '',
  inputs: {
    phone: { type: 'string', required: true, description: 'Số điện thoại cần chuyển đổi' }
  },
  exits: {
    success: {
      description: 'Trả về số điện thoại ở dạng bình thường',
    }
  },
  sync: true,
  fn: function (inputs) {
    let { phone } = inputs;
    return phone;
    // if (!phone) return phone;
    // if (phone.substr(0, 2) === '84') return phone;//already normal
    // if (phone.substr(0, 1) === '0') return `84${phone.substr(1, phone.length)}`;
    // if (phone.substr(0, 3) === '+84') return phone.replace('+', '');
    // return phone;
  }
};

