import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const user = (await User.findById(req.headers.userId)).toJSON();

    if ('admin' !== user.access_level) {
      return res.status(401).json({ error: 'Access level insufient.' });
    }

    return next();
  } catch (err) {
    res.status(400).json({ error: 'No found user with this token' });
  }
};
