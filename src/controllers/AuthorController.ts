import { Request, Response } from 'express';
import { Like } from 'typeorm';

import Author from '../models/author';

export default class AuthorController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 1);
    const search = req.query.search || '';

    const [authors, authorsCount] = await Author.findAndCount({
      where: { name: Like(`%${search}%`) },
      order: { name: 'ASC' },
      take: perPage,
      skip: perPage * page - perPage,
    });

    return res.json({
      data: authors,
      meta: {
        perPage,
        currentPage: page,
        totalItems: authorsCount,
        totalPages: Math.ceil(authorsCount / perPage),
      },
    });
  }

  public static async store(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    try {
      const author = Author.create({ name });
      await author.save();

      return res.status(201).json({ data: author });
    } catch (err) {
      return res.status(400).json({ message: 'Erro while creating author' });
    }
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { name } = req.body;

    try {
      const author = await Author.findOneOrFail(id);

      author.name = name;
      await author.save();

      return res.json({ data: author });
    } catch (error) {
      return res.status(400).json({ message: 'Error while creating author' });
    }
  }

  public static async destroy(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    try {
      const author = await Author.findOneOrFail(id);
      await author.remove();

      return res.json({ data: author });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while dleting author' });
    }
  }
}
