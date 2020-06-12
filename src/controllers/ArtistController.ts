import { Request, Response } from 'express';
import connection from '../database/connection';
import { errors } from '../variables/controller';

const table = 'tb_artists';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const artist = { name };

    try {
      await connection(table).insert(artist);

      return res.status(201).json(artist);
    } catch (err) {
      return res.status(400).json(errors.syntax('create'));
    }
  },
};
