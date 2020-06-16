import { Request, Response } from 'express';
import generateToken from '../utils/generateToken';
import encryptPassword from '../utils/encryptPassword';
import { errors } from '../variables/controller';
import User from '../models/User';

export default {
  async me(request: Request, response: Response): Promise<Response> {
    const user = await User.findOne({ id: request.headers.userId });
    // delete user.password;

    if (user) return response.status(200).json(user);
    else return response.status(404).send();
  },

  async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password, access_level } = request.body;

    const userData = {
      username,
      email,
      password: encryptPassword(password),
      access_level,
    };

    try {
      const user = await User.create(userData);

      return response.status(201).json({
        user: user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      return response.status(400).json(errors.syntax('create'));
    }
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (id !== request.headers.userId) {
      return response.status(401).json(errors.permition);
    }

    await User.destroy({ id });

    return response.status(204).send();
  },

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const newValues = request.body;

    let user = await User.findOne({ id: id });

    if (!user) return response.status(404).json(errors.notFound);
    if (id !== request.headers.userId) return response.status(401).json(errors.permition);

    try {
      user = await User.update({ ...newValues, password: encryptPassword(newValues.password) }, { id });

      return response.status(200).send(user);
    } catch (err) {
      return response.status(400).json(errors.syntax('update'));
    }
  },
};
