/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
_ = require('@sailshq/lodash');
var formatUsageError = require('sails/lib/hooks/blueprints/formatUsageError.js');
const MAX_RECORDS = 100000;
/**
 * Find Records
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the data adapter
 * using the specified criteria.  If an id was specified, just the instance
 * with that unique id will be returned.
 *
 * Optional:
 * @param {Object} where       - the find criteria (passed directly to the ORM)
 * @param {Integer} limit      - the maximum number of records to send back (useful for pagination)
 * @param {Integer} skip       - the number of records to skip (useful for pagination)
 * @param {String} sort        - the order of returned records, e.g. `name ASC` or `age DESC`
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findRecords(req, res) {
  var parseBlueprintOptions = req.options.parseBlueprintOptions || req._sails.config.blueprints.parseBlueprintOptions;

  // Set the blueprint action for parseBlueprintOptions.
  req.options.blueprintAction = 'find';

  var queryOptions = parseBlueprintOptions(req);
  var Model = req._sails.models[queryOptions.using];
  // console.log(queryOptions.meta);
  // if (queryOptions.meta) {
  //   console.log(queryOptions.meta);
  //   queryOptions.meta.enableExperimentalDeepTargets = true;
  // }
  // console.log(queryOptions.criteria)



  if (req.apiInfo && req.apiInfo.downloadReport) {
    delete queryOptions.criteria.skip;
    delete queryOptions.criteria.limit;
    let promises = [
      Model.find(queryOptions.criteria, queryOptions.populates).meta(queryOptions.meta).meta({ enableExperimentalDeepTargets: true })
    ];
    Promise.all(promises).then(rs => {
      let matchingRecords = rs[0];
      switch (req.apiInfo.downloadReport) {
        case 'codeReport':
          return sails.helpers.report.reportCode(matchingRecords).then(bin => {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(bin, 'binary');
          });
        case 'userReport':
          return sails.helpers.report.reportUser(matchingRecords).then(bin => {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(bin, 'binary');
          });
        case 'voucherReport':
          return sails.helpers.report.reportVoucher(matchingRecords).then(bin => {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(bin, 'binary');
          });
        case 'pageReport':
          return sails.helpers.report.reportPage.with({
            pageInfo: req.pageInfo,
            rs: matchingRecords
          }).then(bin => {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(bin, 'binary');
          });
        default:
          return sails.helpers.report.reportBasic(matchingRecords).then(bin => {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
            res.end(bin, 'binary');
          });
      }
    });

  } else {
    let promises = [
      Model.find(queryOptions.criteria, queryOptions.populates).meta(queryOptions.meta).meta({ enableExperimentalDeepTargets: true }),
      Model.count().where(Object.assign({}, actionUtil.parseCriteria(req)))
    ];
    Promise.all(promises).then(rs => {
      let access_token = sails.helpers.jwt.sign.with({
        user: req.user,
        time: Conf.get('TOKEN_EXPIRE')
      })
      return res.ok({
        access_token,
        data: rs[0],
        count: rs[1]
      })
    })
  }




};
