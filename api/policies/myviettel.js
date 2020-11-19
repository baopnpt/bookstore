const ipRangeCheck = require("ip-range-check");
const requestIp = require('request-ip');
const _ = require('lodash');
module.exports = async (req, res, next) => {
    let auth = req.headers.authorization || `Basic ${req.query.accesstoken}`;
    if (!auth || auth.search('Basic ') !== 0) return res.status(401).json(sails.helpers.common.responseError(new Error(Err.CODE.TOKEN_NOT_FOUND)));
    let token = auth.split(' ')[1];
    let secret = Conf.get('SECRET_MYVIETTEL');
    let ips = Conf.get('MY_VIETTEL_IP');

    //check secret
    if (token !== secret && secret !== '*') {
        return res.status(401).json(sails.helpers.common.responseError(new Error(Err.CODE.INVALID_SERVER_IP)));
    }
    //check ip
    if (ips !== '*') {
        ips = ips.split(';');
        if (!_.includes(ips, req.clientIp)) {
            return res.status(401).json(sails.helpers.common.responseError(new Error(Err.CODE.INVALID_SERVER_IP)));
        }
    }

    next();
}