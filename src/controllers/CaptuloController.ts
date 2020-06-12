import { Request, Response } from 'express';
import connection from '../database/connection';
const table = 'tb_captulos';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const capters = await connection(table).select('*');

    return res.json(capters);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const capter = req.body;

    capter.created_at = new Date().toISOString().substr(0, 10);

    const [id] = await connection(table).insert(capter);

    return res.status(201).json({ id, ...capter });
  },

  async delete(req: Request, res: Response): Promise<Response> {
    await connection(table).where({ id: req.headers.userId }).delete();

    return res.status(204).send();
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const newValues = req.body;

    await connection(table).where({ id }).update(newValues);
    const capter = await connection(table).where({ id }).select('*').first();

    return res.json(capter);
  },
};
