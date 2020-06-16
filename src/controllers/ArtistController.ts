import { Request, Response } from 'express';
import Artist from '../models/Artist';
import { errors } from '../variables/controller';

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    try {
      const artist = await Artist.create({ name });

      return res.status(201).json(artist);
    } catch (err) {
      return res.status(400).json(errors.syntax('create'));
    }
  },
};
