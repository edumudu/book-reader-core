const generateUniqueToken = require('../utils/generateUniqueToken');
const encryptPassword = require('../utils/encryptPassword');
const connection = require('../database/connection');

const table = 'tb_users';

const errors = {
  syntax(action) { return { error: `Invalid syntaxy to ${action} user.` }},
  permition: { error: 'Operation not permitted.' },
  notFound: { error: 'User not found' }
}

async function verifyUserToken(id, token) {
  const user = await connection(table)
  .where('id', id)
  .select('token')
  .first();

  return user.token === token;
}

module.exports = {
  async create(request, response) {
    const { username, email, password } = request.body;

    const date = new Date().toISOString().substr(0, 10);

    const data = {
      username,
      email,
      password: encryptPassword(password),
      token: generateUniqueToken(),
      created_at: date
    };

    try {
      const [id] = await connection(table).insert(data);

      return response.status(201).json({ id, ...data });
    } catch (error) {
      return response.status(400).json(errors.syntax('create'));
    }
  },

  async delete(request, response) {
    const userToken = request.headers.authorization;
    const { id } = request.params;

    if (!(await verifyUserToken(id, userToken)))
      return response.status(401).json(errors.permition);

    await connection(table)
      .where('id', id)
      .delete()
    
    return response.status(204).send();
  },

  async update(request, response) {
    const userToken = request.headers.authorization;
    const { id } = request.params;
    const newValues = request.body;
    
    const user = await connection(table).where('id', id).select('*').first();

    if (!user)
      return response.status(404).json(errors.notFound);

    if(!(await verifyUserToken(id, userToken)))
      return response.status(401).json(errors.permition);
    
    try {
      await connection(table)
      .where('id', id)
      .update(newValues)

      return response.status(200).send({ ...user, ...newValues });
    } catch (err) {
      return response.status(400).json(errors.syntax('update'));
    }
  }
}
