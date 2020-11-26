/**
 * Admin.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {

  attributes: {
    name: { type: 'string', maxLength: 255 },
    phone: { type: 'string', maxLength: 100 },
    email: {
      type: 'string', isEmail: true,
      minLength: 5,
      maxLength: 100
    },
    role: { type: 'number', required: true },
    gender: { type: 'number', max: 3 },
    address: { type: 'string', maxLength: 255 },
    username: { type: 'string', maxLength: 255 },
    password: { type: 'string', maxLength: 255 },
    avatar: { type: 'string', maxLength: 255 },
    
  },
  createUserAccount: async input => {

    let old = await Admin.findOne({ username: input.username });
    if (old) throw 'Tên đăng nhập đã tồn tại';
    let userInfo = await Admin.create(input);
    return userInfo;
  }
};

