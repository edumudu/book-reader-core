import { Request, Response } from 'express';
import Chapter from '../entity/chapter';
import { errors } from '../variables/controller';

export default class CaptuloController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const capters = await Chapter.find();

    return res.json(capters);
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const { book_id } = req.body;
    const userId = +(req.headers.userId || -1);
    const chapter = Chapter.create();
    await chapter.save();

    return res.status(201).json(chapter);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const chapter = await Chapter.findOneOrFail(+(req.headers.userId || -1));
    await chapter.remove();

    return res.status(204).send();
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const newValues = req.body;

    try {
      const chapter = await Chapter.findOneOrFail(id);
      await chapter.save(newValues);

      return res.json(chapter);
    } catch (e) {
      switch (e.message) {
        case 'EmptyResponse':
          return res.status(404).json(errors.notFound);
        default:
          return res.status(400).json(errors.syntax('update'));
      }
    }
  }
}
