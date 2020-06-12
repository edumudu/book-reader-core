import bcrypt from 'bcrypt';

export default function encryptPassword(pass: string): string {
  return bcrypt.hashSync(pass, 10);
}
