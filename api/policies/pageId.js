const blueprints = ['create', 'update', 'find', 'destroy'];
const _ = require('lodash');
module.exports = async function (req, res, next) {
    let {
        query,
        params,
        options,
        method
    } = req;
    let { page, api, queryInput, select, skip, limit } = req.query;
    if (queryInput) {
        queryInput = JSON.parse(queryInput);
    } else {
        queryInput = {};
    }

    let input = queryInput;
    if (req.method == 'POST' || req.method == 'PATCH' || req.method == 'PUT') {
        input = req.body;
    }
    if (!page || !api) {
        return res.status(500).json({
            code: Err.CODE.FORBIDDEN,
            message: sails.__('Không tìm được trang')
        });
    }
    var pageInfo = await Page.getPage(page);
    if (!pageInfo) throw {
        code: Err.CODE.FORBIDDEN,
        message: 'Không tìm được thông tin trang'
    };
    if (!page || !api) return res.status(500).json({
        code: Err.CODE.FORBIDDEN,
        message: sails.__('Không tìm được trang')
    });
    pageInfo = await Page.getPage(page);

    //check page role
    if (pageInfo.roles && pageInfo.roles.length > 0 && !_.includes(pageInfo.roles, req.user.role)) {
        return res.status(500).json({
            code: Err.CODE.FORBIDDEN,
            message: sails.__('Không có quyền truy cập trang')
        });
    }
    if (!pageInfo.apis) return res.status(500).json({
        code: Err.CODE.FORBIDDEN,
        message: sails.__('Không tìm được trang')
    });
    let apiInfo = null;
    pageInfo.apis.map(a => {
        if (a.name == api) {
            apiInfo = a;
        }
    });
    if (!apiInfo) return res.status(500).json({
        code: Err.CODE.FORBIDDEN,
        message: sails.__('Không tìm được api')
    });
    let controller = options.model;
    let action = options.action.split('/')[1];

    //check api role
    if (apiInfo.roles && apiInfo.roles.length > 0 && !_.includes(apiInfo.roles, req.user.role))
        return res.status(500).json({
            code: Err.CODE.FORBIDDEN,
            message: sails.__('Không có quyền truy cập')
        });
    req.pageInfo = pageInfo;
    req.apiInfo = apiInfo;
    //check parameters
    let paramCheck = true;
    let prepareData = {},
        criterias = {};
    if (input.id) {
        prepareData = {
            id: input.id
        };
    }
    if (apiInfo.requestFields) {
        let requestFields = apiInfo.requestFields.split(',');
        for (var i = 0; i < requestFields.length; i++) {
            let field = requestFields[i];
            // if (!input[field]) continue;
            // mapInfoField(pageInfo, field, input, prepareData);
            prepareData[field] = input[field];
        }
    } else {
        prepareData = input;
        // for (var i in input) {
        //     mapInfoField(pageInfo, i, input, prepareData);
        // }
    }
    //check api options
    if (apiInfo.options && apiInfo.options.length) {
        apiInfo.options.map(option => {
            if (typeof (option.value) == 'string' && option.value.substr(0, 2) == '--') {
                let k = option.value.substr(2);
                if (k == 'true' || k == 'false') {
                    if (k == 'true') {
                        prepareData[option.key] = 1
                    } else {
                        prepareData[option.key] = 0;
                    }

                } else {
                    if (req.user[k]) {
                        prepareData[option.key] = req.user[k];
                    } else {
                        return res.status(500).json({
                            code: Err.CODE.FORBIDDEN,
                            message: sails.__('Tham số cố định không hợp lệ')
                        });
                    }
                }

            } else {
                prepareData[option.key] = option.value;
            }

        })
    }
    //check api criteria
    if (apiInfo.criterias && apiInfo.criterias.length) {
        apiInfo.criterias.map(crit => {
            if (typeof (crit.value) == 'string' && crit.value.substr(0, 2) == '--') {
                let k = crit.value.substr(2);
                if (k == 'true' || k == 'false') {
                    if (k == 'true') {
                        criterias[crit.key] = 1;
                    } else {
                        criterias[crit.key] = 0;
                    }

                } else {
                    if (req.user[k]) {
                        criterias[crit.key] = req.user[k];
                    } else {
                        return res.status(500).json({
                            code: Err.CODE.FORBIDDEN,
                            message: sails.__('Tham số cố định không hợp lệ')
                        });
                    }
                }

            } else {
                criterias[crit.key] = crit.value;
            }
        })
    }
    let rs = null;
    //if not blueprint
    if (!_.includes(blueprints, action)) {
        let prepareDataKeys = Object.keys(prepareData);
        if (req.method.toUpperCase() === 'GET' && prepareDataKeys.length) {
            action = 'find';
        } else {
            return next();
        }
    }
    switch (action) {
        case 'find':
            Object.assign(prepareData, criterias);
            let exportExcel = false;//req.method == 'GET';
            let data = [];
            if (exportExcel) {
                delete prepareData.skip;
                delete prepareData.limit;
            }
            if (apiInfo.responseFields) {
                // data = await sails.models[controller].find(prepareData, {
                //   select
                // });
                req.query.where = JSON.stringify(prepareData);
                req.query.select = apiInfo.responseFields;
                req.query.limit = limit;
                req.query.skip = skip;
                return next();
            } else {
                // data = await sails.models[controller].find(prepareData);
                req.query.where = JSON.stringify(prepareData);
                req.query.limit = limit;
                req.query.skip = skip;
                return next();
            }
            if (exportExcel) {
                let binary = await reports.genExcel(data);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
                res.end(binary, 'binary');
                return;
            } else {
                if (prepareData.id) return res.ok({
                    data,
                    count: 0,
                    code: 0
                });
                delete prepareData.limit;
                delete prepareData.skip;
                let count = await sails.models[controller].count(prepareData)
                return res.ok({
                    data,
                    count,
                    code: 0
                });
            }
        case 'update':
            criterias.id = Number(params.id);
            try {
                // rs = await sails.models[controller].update(criterias).set(prepareData).fetch();
                req.params = criterias;
                if (prepareData.updatedAt) delete prepareData.updatedAt;
                if (prepareData.createdAt) delete prepareData.createdAt;
                req.body = prepareData;
                return next();
            } catch (err) {
                return res.status(500).json({
                    code: Err.CODE.FORBIDDEN,
                    message: sails.__('Dữ liệu không được cập nhật')
                });
            }
            return;
        case 'create':
            delete prepareData.id;
            req.body = prepareData;
            req.query = {};
            req.params = {};
            try {
                // await sails.models[controller].create(prepareData);
                req.body = prepareData;
                return next();
            } catch (err) {
                return res.status(500).json({
                    code: Err.CODE.FORBIDDEN,
                    message: sails.__('Không tạo được dữ liệu')
                });
            }
            break;
        case 'destroy':
            criterias.id = Number(params.id);
            req.params = criterias;
            req.body = prepareData;
            return next();
            try {
                await sails.models[controller].destroy(criterias);
                res.ok();
            } catch (err) {
                return res.status(500).json({
                    code: Err.CODE.FORBIDDEN,
                    message: sails.__('Xóa lỗi')
                });
            }
            return;
        default:
            req.body = prepareData;
            req.queryInput = prepareData;
            return next();
    }
}
