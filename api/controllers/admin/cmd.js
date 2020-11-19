const util = require('util'),
    exec = util.promisify(require('child_process').exec);
module.exports = {


    friendlyName: 'Cmd',
    type: 'Cmd',

    description: 'Lấy thông tin cần thiết hiển thị trên trang quản trị',


    inputs: {
        cmd: { type: 'string', required: true },
        instance: { type: 'string' }
    },


    exits: {
        success: {
            statusCode: 200
        }
    },


    fn: async function (inputs, exits) {
        let { cmd, instance } = inputs;
        if (sails.config.serverIP !== instance) {
            return exits.success({ code: 1, message: 'invalid instance' })
        }
        let rs = await callCmd(cmd);
        return exits.success({ code: 0, message: 'success', rs })
    }
};

let callCmd = async cmd => {
    const { stdout, stderr } = await exec(cmd);
    return stdout;
}