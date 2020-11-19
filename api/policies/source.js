const ipRangeCheck = require("ip-range-check");
module.exports = async (req, res, next) => {
    try {
        let auth = req.headers.authorization || `Basic ${req.query.accesstoken}`;
        if (!auth || auth.search('Basic ') !== 0) return res.status(401).json(sails.helpers.common.responseError(new Error(Err.CODE.TOKEN_NOT_FOUND)));
        let token = auth.split(' ')[1];
        let sourceInfo = await Source.findOne({ where: { secret: token, active: true } });
        if (sourceInfo.ip) sourceInfo.ip = sourceInfo.ip.trim();
        if (!sourceInfo.ip) {
            return res.status(500).json({
                code: 500,
                message: sails.__('Chưa cấu hình địa chỉ IP')
            });
        }
        if (sourceInfo !== '*' && ipRangeCheck(req.clientIp, sourceInfo.ip)) {
            return res.status(500).json({
                code: 500,
                message: sails.__('Sai địa chỉ IP')
            });
        }
        req.source = sourceInfo;
        next();
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: sails.__('Chưa cấu hình địa chỉ IP'),
            err
        });
    }
}