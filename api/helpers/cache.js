const NodeCache = require("node-cache");
const myCache = new NodeCache();
module.exports = {


    friendlyName: 'Export all vouchers',


    description: '',


    inputs: {
        action: { type: 'string', required: true },
        key: { type: 'string', required: true },
        val: { type: 'ref' },
        ttl: { type: 'number' , description:'time to life'}
    },


    exits: {

        success: {
            description: 'All done.',
        },

    },

    sync: true,
    fn: function (inputs, exits) {
        let { action, key, val, ttl } = inputs;
        switch (action) {
            case 'set':
                myCache.set(key, val, ttl);
                return exits.success();
            default:
                let rs = myCache.get(key);
                return exits.success(rs);

        }
    }
};

