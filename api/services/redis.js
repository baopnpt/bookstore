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
client.setExpire = async (key,data,time = 300) =>{
  data = JSON.stringify(data);
  return client.set(key,data,"EX",time)
}
client.getParse = async (key)=>{
  let data = await client.get(key);
  if(data){
    return JSON.parse(data)
  }else return undefined
}

// client.set = async (key,data)=>{
//    data = JSON.stringify(data)
//   return client.set(key,data)
// }
module.exports = client;
