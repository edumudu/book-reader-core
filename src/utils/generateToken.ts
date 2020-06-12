import jwt from 'jsonwebtoken';

export default function generateToken(params = {}, expires = 86400): string {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: expires,
  });
}
