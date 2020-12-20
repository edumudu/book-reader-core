import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const parts = authToken.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token Malformated' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) return res.status(401).json({ error: 'Token invalid' });

    res.locals.userId = (decoded as { id: string }).id;

    return next();
  });
};
