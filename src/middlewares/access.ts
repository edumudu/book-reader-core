import { Request, Response, NextFunction } from 'express';
import User from '../entity/user';
import { authorized_level } from '../variables/controller';

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const id = +(req.headers.userId || -1);

  try {
    const user = await User.findOneOrFail(id);

    if (!authorized_level.includes(user.role)) {
      return res.status(403).json({ error: 'Access level insufient.' });
    }

    return next();
  } catch (err) {
    res.status(400).json({ error: 'No found user with this token' });
  }
};
