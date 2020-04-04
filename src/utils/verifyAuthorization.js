const { authorized_level } = require('../variables/controller');
const connection = require('../database/connection');

module.exports = async function verifyAuthorization(
  token,
  authorized_levels = authorized_level
) {
  const user = await connection('tb_users')
    .where({ token })
    .select('access_level')
    .first() || {};

  return authorized_levels.includes(user.access_level || '');
}
