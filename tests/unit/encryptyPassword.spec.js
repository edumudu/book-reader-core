const encryptPassword = require('../../src/utils/encryptPassword');
const faker = require('faker');

describe('Encrypt password', () => {
  it('Should encrypt a password', () => {
    const password = faker.random.alphaNumeric();
    const encryptedPassword = encryptPassword(password);

    expect(encryptedPassword).not.toBe(password);
    expect(typeof encryptedPassword).toBe('string');
  });
});
