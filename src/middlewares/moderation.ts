import { Request, Response, NextFunction } from 'express';

import User from '../models/user';

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const id = +(res.locals.userId || -1);

  try {
    const user = await User.findOneOrFail(id);

    if (!['admin', 'mod'].includes(user.role.toLowerCase())) {
      return res.status(403).json({ message: 'Access level insufient' });
    }

    return next();
  } catch (err) {
    return res.status(400).json({ message: 'Not found user with this token' });
  }
};
