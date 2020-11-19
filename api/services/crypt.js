const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const randomstring = require('randomstring');

function generateCodeSevenChar(quanity) {
  let codes = [];
  for (var i = 0; i < quanity; i++) {
    codes.push(
      randomstring.generate({
        length: 7,
        capitalization: "uppercase",
      })
    );
  }
  return codes;
}
function hashCode(str) {
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    // hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function signJwt(data, expire, secret) {
  let token = jwt.sign(
    { data },
    secret ||
      Conf.get("ACCESS_TOKEN_SECRET", "d2f2bef4-b3c6-4963-b366-1fc081738431"),
    { expiresIn: expire }
  );
  return token;
}
function getCacheTime() {
  return 60;
}
function getLongCacheTime() {
  return 3600;
}
function randomCacheTime() {
  return Math.round(Math.random() * 60) + 60;
}
function verifyJwt(token, secret) {
  try {
    let data = jwt.verify(
      token,
      secret ||
        Conf.get("ACCESS_TOKEN_SECRET", "d2f2bef4-b3c6-4963-b366-1fc081738431")
    );
    return data;
  } catch (error) {
    throw flaverr("e_invalid_token");
  }
}

async function checkHash(text, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(text, hash, function (err, result) {
      if (err) resolve(false);
      resolve(result);
    });
  });
}
async function hash(text) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, 10, function (err, hash) {
      resolve(hash);
    });
  });
}

function uuid() {
  return uuidv4();
}
function randomOtp() {
  return Math.round(Math.random() * 8999) + 1000;
}

module.exports = {
  hashCode,
  getLongCacheTime,
  getCacheTime,
  randomCacheTime,
  hash,
  checkHash,
  uuid,
  randomOtp,
  signJwt,
  verifyJwt,
  generateCodeSevenChar
};
