import { Request, Response } from 'express';
import connection from '../database/connection';
import Book from '../models/Book';
import User from '../models/User';
import Artist from '../models/Artist';
import Author from '../models/Author';
import { errors } from '../variables/controller';
import fs from 'fs';

const table = 'tb_books';
const books_dir = process.cwd() + '/assets/books/';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    // const books = await connection('book_category')
    //   .innerJoin(table, 'book_category.book_id', `${table}.id`)
    //   .innerJoin('tb_category', 'book_category.category_id', 'tb_category.id')
    //   .groupBy(`${table}.id`)
    //   .select('tb_books.*', connection.raw('group_concat(tb_category.name) as categorys'));

    const books = await Book.findAll({}, { withRelated: 'categories' });

    return response.status(200).json(books);
  },

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const book = await Book.findById(id, { withRelated: ['categories'] });

      return response.send(book);
    } catch (e) {
      return response.status(404).json(errors.notFound);
    }
  },

  async create(request: Request, response: Response): Promise<Response> {
    const { name, sinopse, type, is_visible, categories, artist_id, author_id } = request.body;

    try {
      const user = await User.findById(request.headers.userId);
      const author = await Author.findById(author_id);
      const artist = await Artist.findById(artist_id);

      const book = new Book({
        name,
        sinopse,
        type,
        is_visible,
      });

      const dir = books_dir + name.replace(/( )/g, '-');
      fs.mkdirSync(dir, { recursive: true });
      // fs.writeFile(dir)

      book.set({ artist_id, author_id, user_id: user.get('id') });
      await book.save();
      await book.related('categories').attach(categories);
      await book.load('categories');

      return response.status(201).json(book);
    } catch (err) {
      return response.status(400).json(errors.syntax('create'));
    }
  },

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const book = await Book.findById(id);
      const dir = books_dir + book.get('name').replace(/( )/g, '-');
      fs.rmdirSync(dir);

      await book.destroy();

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json(errors.syntax('delete'));
    }
  },

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;

    try {
      await connection(table).where({ id }).update(data);
      const book = await connection(table).where({ id }).select('*').first();

      return response.status(200).json(book);
    } catch (err) {
      return response.status(400).json(errors.syntax('update'));
    }
  },
};
