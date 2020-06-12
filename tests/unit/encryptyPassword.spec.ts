import encryptPassword from '../../src/utils/encryptPassword';
import faker from 'faker';

describe('Encrypt password', () => {
  it('Should encrypt a password', () => {
    const password = faker.random.alphaNumeric();
    const encryptedPassword = encryptPassword(password);

    expect(encryptedPassword).not.toBe(password);
    expect(typeof encryptedPassword).toBe('string');
  });
});
