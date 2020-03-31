const connection = require('../database/connection');

const table = 'tb_category';

const errors = {
  syntax(action) { return { error: `Invalid syntaxy to ${action} user.` }},
  permition: { error: 'Operation not permitted.' },
  notFound: { error: 'User not found' }
}

const authorized_level = ['admin', 'mod'];

module.exports = {
  async index(request, response) {
    const count = await connection(table).count('id');
    const categorys = await connection(table).select('*')

    response.header('x-total-count', count);

    return response.status(200).json(categorys);
  },

  async create(request, response) {
    const { name } = request.body;
    const userToken = request.headers.authorization;

    const user = await connection('tb_users')
      .where('token', userToken )
      .select()
      .first();

    if(!authorized_level.includes(user.access_level || ''))
      return response.status(401).json(errors.permition);

    const data = {
      name,
      created_at: new Date().toISOString().substr(0, 10)
    };

    try {
      const [id] = await connection(table).insert(data);

      return response.status(201).json({ id, ...data });
    } catch (err) {
      return response.status(400).json(errors.syntax('create'));
    }
  },

  async update(request, response) {
    // const userToken = request.headers.authorization;
    // const { name } = request.body;
    // const { id } = request.params;

    // const user = await connection('tb_users').where('token', userToken).first();

    // if (!authorized_level.includes(user.access_level))
    //   return response.status(401).json(errors.permition);

    // try {
      // await connection(table)
      // .where('id', id)
      // .update({ name });

      return response.status(204).send();
    // } catch (err) {
      // return response.status(400).send(errors.syntax('update'));
    // }
  },

  async delete(request, response) {
    // const { id } = request.params;
    // const userToken = request.headers.authorization;

    // const user = await connection('tb_users').where('token', userToken).first();

    // if (!authorized_level.includes(user.access_level))
    //   return response.status(401).json(errors.permition);

    // try {
      // await connection(table).where({ id }).delete();

      return response.status(204).send();
    // } catch (err) {
      // return response.status(400).json(errors.syntax('delete'));
    // }
  }
}
