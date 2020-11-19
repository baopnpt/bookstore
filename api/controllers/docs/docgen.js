module.exports = {
  friendlyName: "Docgen",

  description: "Docgen docs.",

  inputs: {},

  exits: {},

  fn: async function(inputs, exits) {
    let actions = sails.getActions();
    let rs = {};
    for (var i in actions) {
      if (!actions[i].IS_MACHINE_AS_ACTION) continue;
      if (actions[i].toJSON) {
        rs[i] = JSON.parse(JSON.stringify({ ...actions[i] }.toJSON()));
        delete rs[i].fn;
        delete rs[i].identity;
      }
    }

    for (var i in rs) {
      rs[i] = { ...rs[i], url: i };
    }

    exits.success({
      data: Object.values(rs),
      prefix: sails.config.blueprints.prefix || ""
    });
    return;
  }
};