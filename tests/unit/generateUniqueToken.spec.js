const generateUniqueToken = require('../../src/utils/generateUniqueToken');

describe('Generate unique token', () => {
  it('Should generate a unique token', () => {
    const token = generateUniqueToken();

    expect(token).toHaveLength(8);
  });
});
