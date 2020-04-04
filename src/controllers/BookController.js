const connection = require('../database/connection');
const { errors } = require('../variables/controller');
const verifyAuthorization = require('../utils/verifyAuthorization');
const fs = require('fs');

const table = 'tb_books';
const books_dir = process.cwd() + '/assets/books/';

module.exports = {
  async index (request, response) {
    const token = request.headers.authorization;

    if (!await verifyAuthorization(token))
      return response.status(401).json(errors.permition);
    
    const books = await connection(table).select('*');

    return response.status(200).json(books);
  },

  async create (request, response) {
    const { name, sinopse, posted_by, type, is_visible, categorys } = request.body;
    const token = await request.headers.authorization;

    if (!await verifyAuthorization(token))
      return response.status(401).json(errors.permition);
    
    try {
      const real_categorys = await connection('tb_category').select('*');
      const book = {
        name,
        sinopse,
        posted_by,
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
    const token = request.headers.authorization;

    if(!await verifyAuthorization(token))
      return response.status(401).json(errors.permition);

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
    const token = request.headers.authorization;

    if(!await verifyAuthorization(token))
      return response.status(401).json(errors.permition);

    try {
      await connection(table).where({ id }).update(data);
      const book = await connection(table).where({ id }).select('*').first();

      return response.status(200).json(book);
    } catch (err) {
      return response.status(400).json(errors.syntax('update'));
    }
  }
}
