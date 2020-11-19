module.exports = {


    friendlyName: 'Get admin meta',
    type: 'backend',

    description: 'Lấy thông tin cần thiết hiển thị trên trang quản trị',


    inputs: {

    },


    exits: {
        success: {
            statusCode: 200
        }
    },


    fn: async function (inputs, exits) {
        let pages = await Page.find(),
            menus = await Menu.find();
        return exits.success({ pages, menus });
    }
};