/**
 * Err.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  },
  CODE: {
    SUCCESS: 0,
    INVALID_PARAMETER: 1, //Thiếu tham số
    TIMEOUT: 2, //Quá thời gian xử lý yêu cầu
    INVALID_CUSTOMER_AGE: 3, //Tuổi khách hàng không phù hợp
    INVALID_CUSTOMER_GENDER: 4, //Giới tính khách hàng không phù hợp
    INVALID_CUSTOMER_PROVINCE: 5, //Tỉnh thành khách hàng không phù hợp
    INVALID_CUSTOMER_GROUP: 6, //Hạng khách hàng không phù hợp
    VOUCHER_IS_NOT_APPROVED: 7, //Voucher chưa được duyệt
    VOUCHER_IS_OUT_OF_CODE: 8, //Chương trình hết mã ưu đãi
    CUSTOMER_IS_OUT_OF_CODE_PROGRAM: 9, //Khách hàng hết lượt lấy mã trong chương trình
    VOUCHER_IS_OUT_OF_CODE_TODAY: 10, //Chương trình hết mã dành cho hôm nay
    CUSTOMER_IS_OUT_OF_CODE_TODAY: 11,//Khách hàng đã hết lượt nhận mã hôm nay
    VOUCHER_IS_OUT_OF_CODE_THIS_HOUR: 12, //Chương trình đã hết lượt lấy mã trong giờ
    CUSTOMER_IS_OUT_OF_CODE_THIS_HOUR: 13, //Chương trình đã hết lượt lấy mã trong giờ
    CANNOT_FIND_CUSTOMER_INFO: 14, //Không tìm được thông tin khách hàng
    CUSTOMER_NOT_ENOUGH_POINT: 15, //Khách hàng không đủ điểm để đổi
    VOUCHER_NOT_FOUND: 16, //Không tìm được thông tin voucher
    PARTNER_IS_NOT_FOUND: 17, //Không tìm được thông tin đối tác
    TOKEN_IS_INVALID: 18, //Phiên làm việc hết hạn
    TOKEN_NOT_FOUND: 19, //Không tìm thấy token
    USER_NAME_ALREADY_EXITS: 20, //Tên đăng nhập đã tồn tại
    USERNAME_PASSWORD_INVALID: 21, //Sai tên đăng nhập hoặc mật khẩu
    OLD_PASSWORD_INVALID: 22,//Mật khẩu cũ không đúng
    POINT_TRANSACTION_FAIL: 23, //Không thể thực hiện giao dịch điểm
    RESERVE_VOUCHER_NOT_FOUND: 24, //Không tìm được thông tin voucher dự bị
    RESERVE_PARTNER_NOT_FOUND: 25, //Không tìm được thông tin đối tác dự bị
    RESERVE_SHOP_NOT_FOUND: 26, //Không tìm được thông tin cửa hàng dự bị
    VOUCHER_IS_NOT_CREATED: 27, //Không tạo được voucher
    PARTNER_IS_NOT_CREATED: 28, //Không tạo được partner
    SHOP_IS_NOT_CREATED: 29,//Không tạo được shop
    FORBIDDEN: 30, //Không có quyền thực thi
    CODE_IS_USED: 31, //Mã code đã được sử dụng trước đó
    CODE_IS_EXPIRED: 32, //Mã code đã hết hạn sử dụng
    CODE_IS_NOT_FOUND: 33,//Code không đúng
    CUSTOMER_ALREADY_RATE_THIS_VOUCHER: 34, //Khách hàng chỉ được đánh giá một lần
    VOUCHER_CODE_IS_NOT_VALID: 35,//Mã voucher không đúng
    VOUCHER_CODE_IS_USED: 36, //Mã voucher đã sử dụng trước đó
    CANNOT_GET_CODE_FROM_SOURCE: 37, //Không thể lấy mã từ nguồn
    SOURCE_NOT_FOUND: 38, //Không tìm được thông tin nguồn
    MAPPING_NOT_FOUND: 39, //Không tìm được thông tin đồng bộ ghép nối
    PASSWORD_IS_NOT_STRENGTH_ENOUGH: 40,// Mật khẩu không đủ mạnh
    INVALID_CAPTCHA: 41, //Mã captcha không đúng
    INVALID_CONFIRM_PASSWORD: 42, //Sai mã xác nhận mật khẩu
    USER_REQUIRE_PHONE_AUTH: 43, //Tài khoản yêu cầu xác thực số điện thoại để đăng nhập
    INVALID_PHONE_AUTH: 44, //Xác thực số điện thoại không đúng
    INVALID_UPLOAD_FILE: 45,//File upload không đúng
    CUSTOMER_IS_NOT_IN_PHONES_LIST: 46, //Khách hàng không nằm trong danh sách được nhận voucher
    UPLOAD_FILE_TOO_BIG: 47, //File upload lên quá lớn
    VOUCHER_IS_GIFT_ONLY: 48,//Voucher chỉ dùng làm quà tặng
    CANNOT_SEND_SMS: 49, //Không thể nhắn tin
    STAMP_GIFT_IS_NOT_FOUND: 50, //Không tìm được quà tặng tích tem
    CUSTOMER_NOT_fOUND: 51, //Không tìm được thông tin khách hàng
    INVALID_SERVER_IP: 52, //Địa chỉ IP không hợp lệ
    CONTACT_CUSTOMER_CARE: 53, //Mã lỗi trả ra cho các voucher liên hệ chăm sóc khách hàng
    FILE_NOT_FOUND: 54, //Không tìm được file
    CANNOT_READ_FILE: 55, //Không đọc được file upload
    VOUCHER_TIME_NOT_YET: 56, //Chưa đến thời điểm áp dụng ưu đãi
    VOUCHER_TIME_PASSED: 57, //Đã qua thời gian áp dụng ưu đãi
    CAMPAIGN_MESSAGE: 58,//Lỗi quá lượt sử dụng chiến dịch
    VOUCHER_IS_NOT_ACTIVE: 59,//Ưu đãi đang được tạm dừng để cập nhật, vui lòng quay lại sau
    CAMPAIGN_IS_NOT_FOUND: 60, //Không tìm được thông tin chiến dịch
    CAMPAIGN_IS_END: 61, //Chiến dịch đã kết thúc
    PROGRAM_NOT_FOUND: 62, //Không tìm được thông tin chương trình
    INVALID_UPDATE_PHONE_TYPE: 63,//Không hỗ trợ kiểu
    VOUCHER_NOT_PAY_VTPAY: 64,//Không hỗ trợ thanh toán ViettelPay
    GET_CODE_TOO_FAST: 65,//Khách hàng lấy mã quá nhanh
    CODE_IS_SENTED : 66, // COde đã được tặng cho người khác
  }
};
