import { Request, Response } from 'express';
import connection from '../database/connection';
import { errors } from '../variables/controller';

const table = 'tb_authors';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const author = { name };

    try {
      await connection(table).insert(author);

      return res.status(201).json(author);
    } catch (err) {
      return res.status(400).json(errors.syntax('create'));
    }
  },
};
