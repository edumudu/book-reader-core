import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection';

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { access_level } = await connection('tb_users')
      .where({ id: req.headers.userId })
      .select('access_level')
      .first();

    if ('admin' !== access_level) {
      return res.status(401).json({ error: 'Access level insufient.' });
    }

    return next();
  } catch (err) {
    res.status(400).json({ error: 'No found user with this token' });
  }
};
