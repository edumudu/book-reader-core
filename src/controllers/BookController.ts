import { Request, Response } from 'express';
import Book from '../entity/book';
import User from '../entity/user';
import Artist from '../entity/artist';
import Author from '../entity/author';
import Category from '../entity/category';
import { errors } from '../variables/controller';
import fs from 'fs';

const books_dir = process.cwd() + '/assets/books/';

export default class BookController {
  public static async index(request: Request, response: Response): Promise<Response> {
    const { like: likeFilter } = request.query;
    let books;

    if (likeFilter) {
      books = await Book.createQueryBuilder()
        .where('name LIKE :name', { name: `%${likeFilter}%` })
        .getMany();
    } else {
      books = await Book.find();
    }

    return response.status(200).json(books);
  }

  public static async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const book = await Book.findOneOrFail(id);

      return response.send(book);
    } catch (e) {
      return response.status(404).json(e);
    }
  }

  public static async create(request: Request, response: Response): Promise<Response> {
    const { name, sinopse, type, is_visible, categories, artist_id, author_id } = request.body;

    try {
      const author = await Author.findOneOrFail(author_id);
      const artist = await Artist.findOneOrFail(artist_id);

      const book = new Book();
      book.name = name;
      book.sinopse = sinopse;
      book.type = type;
      book.is_visible = is_visible;
      book.author = author;
      book.artist = artist;
      book.categories = categories;
      await book.save();

      const dir = books_dir + name.replace(/( )/g, '-');
      fs.mkdirSync(dir, { recursive: true });
      // fs.writeFile(dir)

      return response.status(201).json(book);
    } catch (e) {
      return response.status(400).json(errors.syntax('create'));
    }
  }

  public static async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const book = await Book.findOneOrFail(id);
      const dir = books_dir + book.name.replace(/( )/g, '-');
      fs.rmdirSync(dir);

      await book.remove();

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json(errors.syntax('delete'));
    }
  }

  public static async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;

    try {
      const book = await Book.findOneOrFail(id);
      book.save(data);

      return response.status(200).json(book);
    } catch (err) {
      return response.status(400).json(errors.syntax('update'));
    }
  }
}
