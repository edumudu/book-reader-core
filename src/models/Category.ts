import bookshelf from '../database/bookshelf';
import Book from './Book';
import { Collection } from 'bookshelf';

class Category extends bookshelf.Model<Category> {
  get tableName(): string {
    return 'categories';
  }
  get hasTimestamps(): boolean {
    return true;
  }

  books(): Collection<Book> {
    return this.belongsToMany(Book);
  }
}

export default Category;
