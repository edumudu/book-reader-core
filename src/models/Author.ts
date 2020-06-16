import bookshelf from '../database/bookshelf';
import Book from './Book';
import { Collection } from 'bookshelf';

class Author extends bookshelf.Model<Author> {
  get tableName(): string {
    return 'authors';
  }
  get hasTimestamps(): boolean {
    return true;
  }

  get books(): Collection<Book> {
    return this.hasMany(Book);
  }
}

export default Author;
