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
    let data = {
      from: 'VienThongMN',
      to: sails.helpers.common.formatPhone(otpInfo.phone),
      text : otpInfo.sms
    };  
    let basicAuth = "ZGVtb3VzZXIyOnB5Y05GTDk2OUxV";
        let options = {
          uri : "https://api-02.worldsms.vn/webapi/sendSMS",
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Basic ${basicAuth}`,
          },
          body: JSON.stringify(data),
        };
        let rs = await sails.helpers.common.request(options);
    return;
  },
};
