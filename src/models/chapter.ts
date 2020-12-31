import { Entity, Column, ManyToOne } from 'typeorm';

import BaseModel from './baseModel';
import Book from './book';
import Language from './language';
// import User from './user';

@Entity({ name: 'chapters' })
class Chapter extends BaseModel {
  @Column()
  name?: string;

  @Column()
  number!: number;

  @ManyToOne(() => Book, book => book.chapters)
  book!: Book;

  @ManyToOne(() => Language, language => language.chapters)
  language!: Language;
}

export default Chapter;
