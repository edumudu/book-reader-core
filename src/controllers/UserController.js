const generateToken = require('../utils/generateToken');
const encryptPassword = require('../utils/encryptPassword');
const connection = require('../database/connection');
const { errors } = require('../variables/controller');

const table = 'tb_users';

module.exports = {
  async get (request, response) {

    const user = await connection(table).where({ id: request.userId }).select().first();
    delete user.password;

    if (user)
      return response.status(200).json(user);
    else 
      return response.status(404).send();
  },

  async create(request, response) {
    const { username, email, password, access_level } = request.body;

    const date = new Date().toISOString().substr(0, 10);

    const user = {
      username,
      email,
      password: encryptPassword(password),
      access_level,
      created_at: date
    };

    try {
      const [id] = await connection(table).insert(user);

      return response.status(201).json({ 
        user: { id, ...user },
        token: generateToken({ id })
      });
    } catch (error) {
      return response.status(400).json(errors.syntax('create'));
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    if (id !== request.userId)
      return response.status(401).json(errors.permition);

    await connection(table)
      .where({ id: id })
      .delete()
    
    return response.status(204).send();
  },

  async update(request, response) {
    const { id } = request.params;
    const newValues = request.body;
    
    const user = await connection(table).where('id', id).select('*').first();

    if (!user)
      return response.status(404).json(errors.notFound);

    if(id !== request.userId)
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
