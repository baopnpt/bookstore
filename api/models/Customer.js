/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: { type: 'string', maxLength: 255, defaultsTo: '' },
    phone: { type: 'string', maxLength: 100, defaultsTo: '' },
    facebookId: { type: 'string', defaultsTo: '' },
    googleId: { type: 'string', defaultsTo: '' },
    email: {
      type: 'string',
      allowNull: true
    },
    birth: { type: 'number', allowNull: true },
    gender: { type: 'string', isIn: ['male', 'female', 'other'], defaultsTo: 'male' },
    address: { type: 'string', maxLength: 255, allowNull: true },
    avatar: { type: 'string', maxLength: 255, allowNull: true },
    provinceId: { type: 'number', allowNull: true },
    districtId: { type: 'number', allowNull: true },
    wardId: { type: 'number', allowNull: true },
    levelId: { type: 'number', defaultsTo: 1 },
    password : {type  : 'number'}

  },
  getCustomerInfo : async (id)=>{
    let data = await Customer.findOne({id});
    return data;
  },
  verifyCustomerToken: token => {
    let tokenInfo = sails.services.crypt.verifyJwt(token);
    if (tokenInfo.data.scope !== 'customer') throw flaverr('e_invalid_scope');
    return tokenInfo.data;
  },
  updateCustomerInfo: async (customerId, info) => {
    // let customerInfo = await Customer.getCustomerInfo(customerId);
    // for (var i in info) {
    //   customerInfo[i] = info[i];
    // }
    // sails.services.redis.set(Customer.getCustomerKey(customerId), JSON.stringify(customerInfo),
    //   'ex', Conf.get(`CACHE_TIME_LONG`));
    // sails.services.messagequeue.addDbItem({
    //   action: 'update',
    //   model: 'customer',
    //   updateCrit: customerId,
    //   data: info
    // })
    let customerInfo = await Customer.update({id : customerId}).set(info);
    return customerInfo;
  },
};

