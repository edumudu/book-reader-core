import bookshelf from '../database/bookshelf';
import Book from './Book';
import User from './User';

class Chapter extends bookshelf.Model<Chapter> {
  get tableName(): string {
    return 'chapters';
  }
  get hasTimestamps(): boolean {
    return true;
  }

  book(): Book {
    return this.belongsTo(Book);
  }

  user(): User {
    return this.belongsTo(User);
  }
}

export default Chapter;
