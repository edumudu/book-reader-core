const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization;

  if(!authToken)
    return res.status(401).json({ error: 'No token provided' });
  
  const parts = authToken.split(' ');

  if (parts.length !== 2)
    return res.status(401).json({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: 'Token Malformated' });
    
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalid' });

    req.userId = decoded.id;
    return next();
  })
}