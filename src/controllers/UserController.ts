import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import usersView from '../views/usersView';

export default class UserController {
  public static async delete(request: Request, response: Response): Promise<Response> {
    try {
      const user = await User.findOneOrFail(response.locals.userId);

      await user.remove();

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ message: 'Error when deleting user' });
    }
  }

  public static async update(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const user = await User.findOne(response.locals.userId);

    if (!user) return response.status(404).json({ message: 'Not found user' });

    try {
      user.username = username;
      user.password = password ? bcrypt.hashSync(password, 12) : user.password;
      await user.save();

      return response.status(200).send({
        user: usersView.render(user),
      });
    } catch (err) {
      return response.status(400).json({ message: 'Error when updating user data' });
    }
  }
}
