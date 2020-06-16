import bookshelf from '../database/bookshelf';
import Book from './Book';
import { Collection } from 'bookshelf';

class Artist extends bookshelf.Model<Artist> {
  get tableName(): string {
    return 'artists';
  }
  get hasTimestamps(): boolean {
    return true;
  }

  books(): Collection<Book> {
    return this.hasMany(Book);
  }
}

export default Artist;
