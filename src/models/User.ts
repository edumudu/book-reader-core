import bookshelf from '../database/bookshelf';
import Book from './Book';
import Chapter from './Chapter';
import { Collection } from 'bookshelf';

class User extends bookshelf.Model<User> {
  get tableName(): string {
    return 'users';
  }
  get hasTimestamps(): boolean {
    return true;
  }

  books(): Collection<Book> {
    return this.hasMany(Book);
  }

  chapters(): Collection<Chapter> {
    return this.hasMany(Chapter);
  }
}

export default User;
