import { Request, Response } from 'express';
import Chapter from '../models/Chapter';
import { errors } from '../variables/controller';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const capters = await Chapter.findAll();

    return res.json(capters);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const { book_id } = req.body;
    const chapter = new Chapter({});

    chapter.set({ user_id: req.headers.userId, book_id });
    chapter.save();

    return res.status(201).json(chapter);
  },

  async delete(req: Request, res: Response): Promise<Response> {
    await new Chapter({ id: req.headers.userId }).destroy();

    return res.status(204).send();
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const newValues = req.body;

    try {
      const chapter = await Chapter.update(newValues, { id });

      return res.json(chapter);
    } catch (e) {
      switch (e.message) {
        case 'EmptyResponse':
          return res.status(404).json(errors.notFound);
        default:
          return res.status(400).json(errors.syntax('update'));
      }
    }
  },
};
