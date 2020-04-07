const connection = require('../database/connection');
const { errors } = require('../variables/controller');

const table = 'tb_authors';

module.exports = {
  async create (req, res) {
    const { name } = req.body;

    const author = {
      name,
      created_at: new Date().toISOString().substr(0, 10)
    };

    try {
      await connection(table).insert(author);

      return res.json(author);
    } catch (err) {
      return res.status(400).json(errors.syntax('create'));
    }
  }
}