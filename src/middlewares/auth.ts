import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction): Response | void => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authToken.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token Malformated' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) return res.status(401).json({ error: 'Token invalid' });

    req.headers.userId = (<{ id: string }>decoded).id;

    return next();
  });
};
