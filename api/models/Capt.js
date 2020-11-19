/**
 * Capt.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require('moment');
module.exports = {

  attributes: {
    text: { type: 'string' },
    expiredAt: { type: 'number' }
  },
  beforeCreate: async (instance, cb) => {
    instance.expiredAt = moment().add(Conf.get('CAPTCHA_EXPIRE'), 'minutes').valueOf();
    cb();
  },
  checkCaptcha: async (id, text) => {
    let captInfo = await Capt.findOne({ id, expiredAt: { '>=': moment().valueOf() } })
    if (!captInfo) return false;
    if (captInfo.text != text) return false;
    //delete capt
    await Capt.destroy({ id });
    return true;
  }
};

