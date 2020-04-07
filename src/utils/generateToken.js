const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = function generateToken(params = {}, expires = 86400) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: expires,
  });
}
