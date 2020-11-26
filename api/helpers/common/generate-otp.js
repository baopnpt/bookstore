const mysql = require('mysql');
module.exports = {


    friendlyName: 'Sinh mã OTP',
    description: '',
    inputs: {
    },
    exits: {
        success: {
            description: 'All done.',
        },
    },
    sync: true,

    fn: function (inputs, exits) {
        return exits.success(Math.floor(Math.random() * 9000 + 1000) + '');
    }
};

