const NodeCache = require("node-cache");
const myCache = new NodeCache();
/**
 *
 * @param {string} key cache key
 * @param {object} val the value
 * @param {number} ttl [optional] time to live in seconds
 */
function set(key, val, ttl) {
  if (ttl) return myCache.set(key, val, ttl);
  myCache.set(key, val);
}
/**
 *
 * @param {string} key cache key
 */
function get(key) {
  let rs = myCache.get(key);
  return rs;
}
/**
 *
 * @param {array} keys list keys to get
 */
function mget(keys) {
  let rs = myCache.mget(keys);
  return rs;
}
/**
 *
 * @param {array} keys multiple key val pairs
 */
function mset(keys) {
  let rs = myCache.mset(keys);
  return rs;
}

function del(key) {
  myCache.del(key);
}

module.exports = { get, set, mget, mset, del };
