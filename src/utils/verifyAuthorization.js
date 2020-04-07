const { authorized_level } = require('../variables/controller');
const connection = require('../database/connection');

module.exports = async function verifyAuthorization(
  id,
  authorized_levels = authorized_level
) {
  const user = await connection('tb_users')
    .where({ id })
    .select('access_level')
    .first() || {};

  return authorized_levels.includes(user.access_level || '');
}
