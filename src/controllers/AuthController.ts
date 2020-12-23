import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export default class AuthController {
  public static async register(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body as Pick<User, 'email' | 'password' | 'username'>;

    const userData = {
      username,
      email,
      password: bcrypt.hashSync(password, 12),
      role: 'user' as User['role'],
    };

    try {
      const user = User.create(userData);
      await user.save();

      return response.status(201).json({
        user,
        token: AuthController.generateToken({ id: user.id }),
      });
    } catch (error) {
      return response.status(400).json({ message: 'Error while creating user' });
    }
  }

  public static async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as Pick<User, 'email' | 'password'>;
    let user;

    try {
      user = await User.findOneOrFail(
        { email },
        { select: ['password', 'email', 'id', 'createdAt', 'updatedAt', 'username', 'role'] },
      );
    } catch (error) {
      return res.status(404).json({ message: 'Not found user' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).json({ message: 'Invalid password' });
    }

    return res.json({
      user,
      token: AuthController.generateToken({ id: user.id }),
    });
  }

  public static async me(request: Request, response: Response): Promise<Response> {
    const user = await User.findOne(Number(response.locals.userId));

    return user ? response.json({ data: user }) : response.status(404).send({ message: 'Not found user' });
  }

  public static async delete(request: Request, response: Response): Promise<Response> {
    return response.send();
  }

  private static generateToken(params = {}, expires = 86400): string {
    return jwt.sign(params, process.env.JWT_SECRET as string, {
      expiresIn: expires,
    });
  }
}
