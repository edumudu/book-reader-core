import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

export default function generateToken(params = {}, expires = 86400): string {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: expires,
  });
}
