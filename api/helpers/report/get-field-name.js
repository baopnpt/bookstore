const bcrypt = require('bcryptjs');

module.exports = {


    friendlyName: 'Check hash',


    description: '',


    inputs: {
        pageInfo: { type: 'ref', required: true },
        apiName: { type: 'ref', required: true },
        query: { type: 'ref', required: true }
    },


    exits: {

        success: {
            description: 'All done.',
        },

    },
    fn: async function (inputs, exits) {
        let { pageInfo, apiName, query } = inputs;
        let apiInfo = null;
        for (var i = 0; i < pageInfo.apis.length; i++) {
            if (pageInfo.apis[i].name === apiName) {
                apiInfo = pageInfo.apis[i];
            }
        }
        if (!apiInfo) throw 'invalid api';
        //find model
        let modelName = apiInfo.url.replace('/api/', ''), model = null;
        for (var index in sails.models) {
            if (index.toLowerCase() === modelName.toLowerCase()) {
                model = sails.models[index];
            }
        }
        if (!model) return [];
        let rs = await model.find(query);
        return exits.success(rs);
    }
};

