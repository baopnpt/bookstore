/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    totalMoney: { type: 'number', required: true },
    // thong tin ngươi order
    customerId: { type: 'number', required: true },
    receiveName: { type: 'string', required: true },
    receivePhone: { type: 'string', required: true },
    receiveEmail: { type: 'string', allowNull: true },
    provinceId: { type: 'number', allowNull: true },
    districtId: { type: 'number', allowNull: true },
    wardId: { type: 'number', allowNull: true },
    address: { type: 'string', allowNull: true },
    shipMoney: { type: 'number' },

    status: {
      type: 'string',
      isIn: ['wait_for_confirmation', 'comfirmed', 'processing', 'shipping', 'done', 'completed', 'cancel', 'failed', 'refund', 'refunded'],
      defaultsTo: 'pending'
    },

    itemCount: { type: 'number' },
    image: { type: 'string' },
    note: { type: 'string', allowNull: true },
    // discountCodeId: { type: 'string', allowNull: true },
    // discount: { type: 'number', allowNull: true },
    typeOrder: { type: 'string', defaultsTo: 'customer' },
    
    // cancelReason: { type: 'string', allowNull: true },
    // linkReturnUrl: { type: 'string', allowNull: true },
    methodPayment: {
      type: 'string',
      //isIn: ['cod', 'online']
      allowNull: true
    }
  },

};

