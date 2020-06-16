import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import generateToken from '../utils/generateToken';
import { errors } from '../variables/controller';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    let user;

    try {
      user = (await User.findOne({ email })).toJSON();
    } catch (error) {
      return res.status(404).json(errors.notFound);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).json({ error: 'Invalid password' });
    }

    return res.json({ token: generateToken({ id: user.id }) });
  },

  async delete(req: Request, res: Response): Promise<Response> {
    return res.send();
  },
};
