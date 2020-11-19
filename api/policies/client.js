const ipRangeCheck = require('ip-range-check');
const requestIp = require('request-ip');
const _ = require('lodash');
module.exports = async (req, res, next) => {
  try {
    let auth = req.headers.authorization || `Basic ${req.query.accesstoken}`;
    if (!auth || auth.search('Basic ') !== 0) {
      return res
        .status(401)
        .json(
          sails.helpers.common.responseError(
            new Error(Err.CODE.TOKEN_NOT_FOUND)
          )
        );
    }
    let token = auth.split(' ')[1];
    let arr = Buffer.from(token, 'base64')
      .toString()
      .split(':');
    let username = arr[0];
    let password = arr[1];
    let ip = req.clientIp;
    let clientInfo = await Client.verifyClient({ token, username, password, ip });
    req.clientInfo = clientInfo;
    next();
  } catch (err) {
    return res
      .status(401)
      .json(
        sails.helpers.common.responseError(
          new Error(Err.CODE.INVALID_SERVER_IP)
        )
      );
  }
};
