const connection = require('../database/connection');
const { errors } = require('../variables/controller');
const fs = require('fs');

const table = 'tb_books';
const books_dir = process.cwd() + '/assets/books/';

module.exports = {
  async index (request, response) {
    const books = await connection('book_category')
      .innerJoin(table, 'book_category.book_id', `${table}.id`)
      .innerJoin('tb_category', 'book_category.category_id', 'tb_category.id')
      .groupBy(`${table}.id`)
      .select('tb_books.*', connection.raw('group_concat(tb_category.name) as categorys'));

    return response.status(200).json(books);
  },

  async show (request, response) {
    const { id } = request.params;

    const book = await connection('book_category')
      .where(`${table}.id`, id)
      .innerJoin(table, 'book_category.book_id', `${table}.id`)
      .innerJoin('tb_category', 'book_category.category_id', 'tb_category.id')
      .groupBy(`${table}.id`)
      .select('tb_books.*', connection.raw('group_concat(tb_category.name) as categorys'))
      .first();

    if (!book)
      return response.status(404).json(errors.notFound);
    
    book.categorys = book.categorys.split(',');
    return response.send(book);
  },

  async create (request, response) {
    const { name, sinopse, type, is_visible, categorys, artist_id, author_id } = request.body;
    
    try {
      const real_categorys = await connection('tb_category').select('*');
      const book = {
        name,
        sinopse,
        author_id,
        artist_id,
        posted_by: request.userId,
        type,
        is_visible,
        created_at: new Date().toISOString().substr(0, 10)
      }

      const dir = books_dir + name.replace(/( )/g, '-');
      fs.mkdirSync(dir, { recursive: true });
      // fs.writeFile(dir)
      
      const [id] = await connection(table).insert(book);
      await connection('book_category').insert(categorys.map(category => ({
        book_id: id,
        category_id: real_categorys.find(c => c.name === category).id
      })));

      return response.status(201).json({ id, ...book });
    } catch (err) {
      return response.status(400).json(errors.syntax('create'));
    }
  },

  async delete (request, response) {
    const { id } = request.params;

    try {
      const book = await connection(table).where({ id }).select('*').first() || {};
      const dir = books_dir + book.name.replace(/( )/g, '-');
      fs.rmdirSync(dir);

      await connection(table)
        .where({ id })
        .delete();

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json(errors.syntax('delete'))
    }
  },

  async update (request, response) {
    const { id } = request.params;
    const data = request.body;

    try {
      await connection(table).where({ id }).update(data);
      const book = await connection(table).where({ id }).select('*').first();

      return response.status(200).json(book);
    } catch (err) {
      return response.status(400).json(errors.syntax('update'));
    }
  }
}
