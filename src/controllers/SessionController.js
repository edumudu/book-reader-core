const connection = require('../database/connection');
const encryptPassword = require('../utils/encryptPassword');
const generateToken = require('../utils/generateToken');
const { errors } = require('../variables/controller');

const table = 'tb_users';

module.exports = {
  async create (request, response) {
    const { email, password } = request.body;

    const user = await connection(table).where({ email }).select().first();

    if (!user)
      return response.status(400).json(errors.notFound);

    if (user.password !== encryptPassword(password))
      return response.status(400).json({ error: 'Invalid password' });

    return response.json({ token: generateToken({ id: user.id }) });
  },

  async delete (request, response) {
    return response.send();
  }
}