import { Request, Response } from 'express';

import Chapter from '../models/chapter';
import Book from '../models/book';
import Language from '../models/language';

export default class CaptuloController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 15);

    const [chapters, chaptersCount] = await Chapter.findAndCount({
      order: { id: 'ASC' },
      take: perPage,
      skip: page * perPage - perPage,
      relations: ['language'],
    });

    return res.json({
      data: chapters,
      meta: {
        perPage,
        currentPage: page,
        totalItems: chaptersCount,
        totalPages: Math.ceil(chaptersCount / perPage),
      },
    });
  }

  public static async store(req: Request, res: Response): Promise<Response> {
    const { name, number, bookId, languageId } = req.body;

    try {
      const book = await Book.findOneOrFail({ where: { id: bookId } });
      const language = await Language.findOneOrFail({ where: { id: languageId } });
      const chapter = Chapter.create({ name, number });

      chapter.book = book;
      chapter.language = language;

      await chapter.save();

      return res.json({ data: chapter });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while creating chapter' });
    }
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { name, number } = req.body;

    try {
      const chapter = await Chapter.findOneOrFail(id);

      chapter.name = name;
      chapter.number = number;
      await chapter.save();

      return res.json({ data: chapter });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while updating chapter' });
    }
  }

  public static async destroy(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    try {
      const chapter = await Chapter.findOneOrFail(id);

      await chapter.remove();

      return res.json({ data: chapter });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while destroyng chapter' });
    }
  }
}
