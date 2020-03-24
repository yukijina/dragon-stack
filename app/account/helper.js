const SHA256 = require('crypto-js/sha256');
//// SHA256 returns hash equivalent any piece of string
///  We will make more complex/secure - add additonal string with APP_SECRET
const { APP_SECRET } = require('../../secrets');


const hash = string => {
  /// SHA256 function returns complex object - by toString(), it convers hash equivalent string
  return SHA256(`${APP_SECRET}${string}${APP_SECRET}`).toString();
}

module.exports = { hash };