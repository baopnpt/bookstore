/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const fs = require('fs'),
  path = require('path');
module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await Admin.count() > 0) {
  //   return;
  // }
  //
  // await Admin.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  // Approve.approveAll();

  await bootstrapAllControllers();
  // console.log(sails.helpers.common.hash('UeXmaYw76fYQbmvA'));
  setTimeout(async () => {
    await sails.helpers.common.syncUploadFile();
  }, 3000);
  // syncallvouchers();
  // combineLogo();
  // await sails.helpers.dbToRedis();
  // let v = require('../initv.json');
  // await Sentinel.set('ALL_VOUCHERS', v);
  // Voucher.refreshHomeData().then(rs => { })
  if (_.includes(process.argv, 'init')) {
    await initDatabase();
  }
};


let initialize = async () => {
  let promises = [];
  for (var index in sails.models) {
    let model = sails.models[index];
    if (model.init) {
      promises.push(model.init());
    }
  }
  await Promise.all(promises);
}
async function initDatabase() {
  let folder = path.join(__dirname, '../init')
  let rs = fs.readdirSync(folder);
  for (var i = 0; i < rs.length; i++) {
    try {
      let data = JSON.parse(fs.readFileSync(path.join(folder, rs[i]), 'utf8'));
      let model = rs[i].split('.')[0];
      await sails.models[model].createEach(data);
    } catch (err) {
      console.log(`error on init `, err);
      continue;
    }
  }
}
let bootstrapAllControllers = async () => {
  let promises = [];
  for (var index in sails.models) {
    let model = sails.models[index];
    if (model.bootstrap) {
      promises.push(model.bootstrap());
    }
  }
  await Promise.all(promises);
}

