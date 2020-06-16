import bookshelf from '../database/bookshelf';
import Category from './Category';
import Chapter from './Chapter';
import User from './User';
import Author from './Author';
import Artist from './Artist';
import { Collection } from 'bookshelf';
import { response } from 'express';

class Book extends bookshelf.Model<Book> {
  get tableName(): string {
    return 'books';
  }
  get hasTimestamps(): boolean {
    return true;
  }

  user(): User {
    return this.belongsTo(User);
  }

  author(): Author {
    return this.belongsTo(Author);
  }

  artist(): Artist {
    return this.belongsTo(Artist);
  }

  chapters(): Collection<Chapter> {
    return this.hasMany(Chapter);
  }

  categories(): Collection<Category> {
    return this.belongsToMany(Category);
  }
}

export default Book;
