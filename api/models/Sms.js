/**
 * Sms.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // request: {
    //   type: "json",
    // },
    // response: {
    //   type: "json",
    // },
    // sendStatus: {
    //   type: "number",
    //   defaultsTo: 1,
    // },
    // error: {
    //   type: "string",
    // },
    // phone: {
    //   type: "string",
    // },
    // duration: {
    //   type: "number",
    // },
    // sms: {
    //   type: "string",
    // },
  },
  sendSMS: async (otpInfo) => {
    if (sails.config.mode == "staging") {
      return true;
    }
    let body = await sails.helpers.common.request({
      uri: Conf.get("OTP_URI","https://app.mgreen.vn/v1/notification/push-sms") ,
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        phone: otpInfo.phone,
        body: otpInfo.sms,
        secret: Conf.get("OTP_SECRET","2b4c9a82-6506-4960-ada6-1665ff38a539"),
      }),
    });
    return
  },
};
