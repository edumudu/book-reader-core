import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connection from '../database/connection';
import generateToken from '../utils/generateToken';
import { errors } from '../variables/controller';

const table = 'tb_users';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await connection(table).where({ email }).select().first();

    if (!user) return response.status(404).json(errors.notFound);

    if (bcrypt.compareSync(password, user.password)) {
      return response.status(403).json({ error: 'Invalid password' });
    }

    return response.json({ token: generateToken({ id: user.id }) });
  },

  async delete(request: Request, response: Response): Promise<Response> {
    return response.send();
  },
};
