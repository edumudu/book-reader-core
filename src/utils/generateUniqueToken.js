const crypto = require('crypto');

module.exports = function generateUniqueToken() {
  return crypto.randomBytes(4).toString('HEX');
}
