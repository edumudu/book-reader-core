const connection = require('../database/connection');
const { errors } = require('../variables/controller');

const table = 'tb_artists';

module.exports = {
  async create (req, res) {
    const { name } = req.body;

    const artist = {
      name,
      created_at: new Date().toISOString().substr(0, 10)
    };

    try {
      await connection(table).insert(artist);

      return res.json(artist);
    } catch (err) {
      return res.status(400).json(errors.syntax('create'));
    }
  }
}