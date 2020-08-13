import { Request, Response } from 'express';
import generateToken from '../utils/generateToken';
import encryptPassword from '../utils/encryptPassword';
import { errors } from '../variables/controller';
import User from '../entity/user';

export default class UserController {
  public static async me(request: Request, response: Response): Promise<Response> {
    const user = await User.findOneOrFail(+(request.headers.userId || -1));
    // delete user.password;

    if (user) return response.status(200).json(user);
    else return response.status(404).send();
  }

  public static async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password, role } = request.body;

    const userData = {
      username,
      email,
      password: encryptPassword(password),
      role,
    };

    try {
      const user = User.create(userData);
      await user.save();

      return response.status(201).json({
        user: user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      return response.status(400).json(errors.syntax('create'));
    }
  }

  public static async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (id !== request.headers.userId) {
      return response.status(401).json(errors.permition);
    }

    (await User.findOneOrFail(id)).remove();

    return response.status(204).send();
  }

  public static async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { username, password } = request.body;

    const user = await User.findOneOrFail(id);

    if (!user) return response.status(404).json(errors.notFound);
    if (id !== request.headers.userId) return response.status(401).json(errors.permition);

    try {
      user.username = username;
      user.password = encryptPassword(password);
      await user.save();

      return response.status(200).send(user);
    } catch (err) {
      return response.status(400).json(errors.syntax('update'));
    }
  }
}
