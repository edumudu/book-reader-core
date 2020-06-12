import { Request, Response } from 'express';
import connection from '../database/connection';
import encryptPassword from '../utils/encryptPassword';
import generateToken from '../utils/generateToken';
import { errors } from '../variables/controller';

const table = 'tb_users';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await connection(table).where({ email }).select().first();

    if (!user) return response.status(400).json(errors.notFound);

    if (user.password !== encryptPassword(password)) {
      return response.status(400).json({ error: 'Invalid password' });
    }

    return response.json({ token: generateToken({ id: user.id }) });
  },

  async delete(request: Request, response: Response): Promise<Response> {
    return response.send();
  },
};
