const _ = require('lodash');
module.exports = async (req, res, next) => {
  let ignoreActions = ['find'];
  let model = req.options.model;
  let action = req.options.action.split('/')[1];
  if (_.includes(ignoreActions, action)) {return next();}
  next();
  try {
    ActionLog.create({
      model,
      action,
      user: req.user ? req.user.id : null,
      role: req.user ? req.user.role : null,
      data: req.body,
      ip: req.clientIp,
    })
      .then(rs => {})
      .catch(err => {});
  } catch (err) {}
};
