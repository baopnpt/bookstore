const bcrypt = require('bcryptjs'), moment = require('moment')
module.exports = {


    friendlyName: 'Check hash',


    description: '',


    inputs: {
        pageInfo: { type: 'ref', required: true },
        rs: { type: 'ref', required: true }
    },


    exits: {

        success: {
            description: 'All done.',
        },

    },
    fn: async function (inputs, exits) {
        let { pageInfo, rs } = inputs;
        let modelSelectIds = {}, gInfos = [], promises = [], header = {};
        pageInfo.grid.map(g => {
            header[g.field] = g.name;
        })
        rs.map(d => {
            pageInfo.grid.map(g => {
                if (g.modelSelect) {
                    if (!modelSelectIds[g.field]) modelSelectIds[g.field] = [];
                    if (d[g.field] && !_.includes(modelSelectIds[g.field], d[g.field])) modelSelectIds[g.field].push(d[g.field])
                }
                return null;
            })
            return null;
        });

        for (var i = 0; i < pageInfo.grid.length; i++) {
            if (!pageInfo.grid[i].modelSelect) continue;
            let gInfo = pageInfo.grid[i];
            if (!(modelSelectIds[gInfo.field] && modelSelectIds[gInfo.field].length > 0)) continue;
            gInfos.push(gInfo);
            promises.push(sails.helpers.report.getFieldName.with({
                pageInfo,
                apiName: gInfo.modelSelectApi,
                query: { where: { id: modelSelectIds[gInfo.field] }, select: ['name', 'id'] }
            }))
        }
        let fieldNameRs = await Promise.all(promises);
        rs.map(item => {
            for (var gi = 0; gi < pageInfo.grid.length; gi++) {
                if (pageInfo.grid[gi].modelSelect) {
                    for (var i = 0; i < gInfos.length; i++) {
                        let gInfo = gInfos[i];
                        for (var fi = 0; fi < fieldNameRs[i].length; fi++) {
                            if (!fieldNameRs[i][fi]) continue;
                            if (fieldNameRs[i][fi].id === item[gInfo.field]) {
                                item[gInfo.field] = fieldNameRs[i][fi].name;
                                break;
                            }
                        }
                    }
                } else {
                    if (pageInfo.grid[gi].type === 'date' && item[pageInfo.grid[gi].field]) {
                        item[pageInfo.grid[gi].field] = moment(item[pageInfo.grid[gi].field]).format('DD/MM/YYYY HH:mm:ss');
                    }
                    if (pageInfo.grid[gi].enumable) {
                        for (var fi = 0; fi < pageInfo.grid[gi].items.length; fi++) {
                            if (item[pageInfo.grid[gi].field] == pageInfo.grid[gi].items[fi].value) {
                                item[pageInfo.grid[gi].field] = pageInfo.grid[gi].items[fi].key;
                            }
                        }
                    }
                }
            }
        })
        let binary = await sails.helpers.report.reportBasic.with({ data: rs, header })
        return exits.success(binary);
    }
};

