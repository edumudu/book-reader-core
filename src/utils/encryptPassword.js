const crypto = require('crypto');
 
module.exports = function encryptPassword(pass) {
  const mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
  const myStr = mykey.update(pass, 'utf8', 'hex')

  return myStr + mykey.final('hex');
}
