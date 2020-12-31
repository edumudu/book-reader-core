import { Request, Response } from 'express';
import { Like } from 'typeorm';

import Book from '../models/book';
import Artist from '../models/artist';
import Author from '../models/author';
import Category from '../models/category';

export default class BookController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 15);
    const search = req.query.search || '';

    const [books, booksCount] = await Book.findAndCount({
      where: { title: Like(`%${search}%`) },
      order: { title: 'ASC' },
      take: perPage,
      skip: page * perPage - perPage,
      relations: ['artists', 'authors', 'categories'],
    });

    return res.json({
      data: books,
      meta: {
        perPage,
        currentPage: page,
        totalItems: booksCount,
        totalPages: Math.ceil(booksCount / perPage),
      },
    });
  }

  public static async store(req: Request, res: Response): Promise<Response> {
    const { title, description, type, authorsIds, artistsIds, categoryIds } = req.body;

    try {
      const authors = await Author.findByIds(authorsIds);
      const artists = await Artist.findByIds(artistsIds);
      const categories = await Category.findByIds(categoryIds);
      const book = Book.create({ title, description, type });

      book.artists = artists;
      book.authors = authors;
      book.categories = categories;

      await book.save();

      return res.json({ data: book });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while creating book' });
    }
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { title, description, type, authorsIds, artistsIds, categoryIds } = req.body;

    try {
      const authors = await Author.findByIds(authorsIds);
      const artists = await Artist.findByIds(artistsIds);
      const categories = await Category.findByIds(categoryIds);
      const book = await Book.findOneOrFail(id);

      book.title = title;
      book.description = description;
      book.type = type;
      book.artists = artists;
      book.authors = authors;
      book.categories = categories;

      await book.save();

      return res.json({ data: book });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while updating book' });
    }
  }

  public static async destroy(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    try {
      const book = await Book.findOneOrFail(id);

      await book.remove();

      return res.json({ data: book });
    } catch (error) {
      return res.status(400).json({ message: 'Erro while destroyng book' });
    }
  }
}
