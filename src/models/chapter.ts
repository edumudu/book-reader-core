import { Entity, Column, ManyToOne } from 'typeorm';

import BaseModel from './baseModel';
import Book from './book';
// import User from './user';

@Entity({ name: 'chapters' })
class Chapter extends BaseModel {
  @Column()
  name?: string;

  @Column()
  number!: number;

  @ManyToOne(type => Book, book => book.chapters)
  book!: Book;
}

export default Chapter;
