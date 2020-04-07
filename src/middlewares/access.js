const connection = require('../database/connection');

module.exports = async (req, res, next) => {
  try {
    const { access_level } = await connection('tb_users').where({ id: req.userId }).select('access_level').first();

    if ('admin' !== access_level)
      return res.status(401).json({ error: 'Access level insufient.' });
  
    return next();
  } catch (err) {
    res.status(400).json({ error: 'No found user with this token' });
  }
}