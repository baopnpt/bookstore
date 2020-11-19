module.exports = async (req, res, next) => {
    try {
        let { phone } = req.body;
        if (!phone) throw { code: 1, message: sails.__('Thiếu dữ liệu số điện thoại khách hàng') };
        try {
            let userInfo = await Admin.getCustomerInfoByPhone(phone);
            req.user = userInfo;
            next();
        } catch (err) {
            throw { code: 2, message: sails.__('Không tìm được thông tin khách hàng') }
        }
    } catch (err) {
        return res.status(404).json(err);
    }

}