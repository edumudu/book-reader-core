import { Request, Response } from 'express';
import Author from '../models/Author';
import { errors } from '../variables/controller';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    try {
      const author = await Author.create({ name });

      return res.status(201).json(author);
    } catch (err) {
      return res.status(400).json(errors.syntax('create'));
    }
  },
};
