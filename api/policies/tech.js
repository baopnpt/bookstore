const ipRangeCheck = require("ip-range-check");
module.exports = async (req, res, next) => {
    try {
        let auth = req.headers.authorization || `Basic ${req.query.accesstoken}`;
        if (!auth || auth.search('Basic ') !== 0) return res.status(401).json(sails.helpers.common.responseError(new Error(Err.CODE.TOKEN_NOT_FOUND)));
        let token = auth.split(' ')[1];
        if (token === Conf.get('SECRET_KEY_TECHNICAL')) {
            next();
        } else {
            res.status(500).json({
                code: 401,
                message: 'invalid auth'
            });
        }
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: sails.__('Chưa cấu hình địa chỉ IP'),
            err
        });
    }
}