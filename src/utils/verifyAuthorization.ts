import { authorized_level } from '../variables/controller';
import connection from '../database/connection';

export default async function verifyAuthorization(
  id: number | string,
  authorized_levels = authorized_level,
): Promise<boolean> {
  const user = (await connection('users').where({ id }).select('access_level').first()) || {};

  return authorized_levels.includes(user.access_level || '');
}
