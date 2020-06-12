import crypto from 'crypto';

export default function encryptPassword(pass: string): string {
  const mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
  const myStr = mykey.update(pass, 'utf8', 'hex');

  return myStr + mykey.final('hex');
}
