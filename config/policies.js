/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  "*": ["bearer", "pageId"],
  "user/create-captcha": true,
  "user/login": true,
  "meta/get-province": "client",
  "meta/get-all-provinces": "client",
  "meta/active-cron-job": true,
  "admin/get-meta": true,
  "admin/query": "tech",
  "admin/cmd": "tech",
  "file/upload-image": "bearer",
  "file/upload-file": "bearer",
  "user/logout": "customer",
  "category/get-list-category": true,
  "customer/login-by-phone": true,
  "otp/send-otp": true,
  "otp/verify-otp": true,
  "product/get-list-product" : true,
  "banner/get-list-banner" : true,
  "product/get-product-info" : true,
  "customer/get-customer-info" : "customer",
  "customer/update-customer-info" : "customer"
};
