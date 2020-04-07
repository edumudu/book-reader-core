const connection = require('../database/connection');
const table = 'tb_captulos';

module.exports = {
  async index (req, res) {
    const capters = await connection(table).select('*');

    return res.json(capters);
  },

  async create (req, res) {
    const capter = req.body;

    capter.created_at = new Date().toISOString().substr(0, 10);

    const [id] = await connection(table).insert(capter);

    return res.status(201).json({ id, ...capter });
  },

  async delete (req, res) {
    await connection(table).where({ id: req.userId }).delete();

    return res.status(204).send();
  },

  async update (req, res) {
    const { id } = req.params;
    const newValues = req.body;

    await connection(table).where({ id }).update(newValues);
    const capter = await connection(table).where({ id }).select('*').first();

    return res.json(capter);
  }
}