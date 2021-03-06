const moment = require('moment');
const _ = require('lodash');
module.exports = async (req, res, next) => {
  try {
    let auth = req.headers.authorization || `Bearer ${req.query.accesstoken}`;
    if (!auth || auth.search('Bearer ') !== 0) {
      return res
        .status(401)
        .json(
          sails.helpers.common.responseError(
            new Error(Err.CODE.TOKEN_NOT_FOUND)
          )
        );
    }
    let token = auth.split(' ')[1];
    let tokenInfo = await Customer.verifyCustomerToken(token);
    req.customerId = tokenInfo.customerId;
    return next();
  } catch (err) {
    return res
      .status(401)
      .json(
        sails.helpers.common.responseError(new Error(Err.CODE.TOKEN_IS_INVALID))
      );
  }
};
