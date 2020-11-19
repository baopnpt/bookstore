const asyncRedis = require("async-redis");
const client = asyncRedis.createClient(sails.config.redis);
client.on("ready", function (err) {
  console.log("Redis ===> Ok!");
});
client.runMulti = (multi) => {
  return new Promise((resolve, reject) => {
    multi.exec((err, replies) => {
      if (err) return reject(err);
      return resolve(replies);
    });
  });
};
module.exports = client;
