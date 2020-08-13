import BaseModel from './baseModel';
import { Entity, Column, ManyToOne } from 'typeorm';
import Book from './book';
import User from './user';

@Entity({
  name: 'chapters',
})
class Chapter extends BaseModel {
  @Column()
  name!: string;

  @ManyToOne(tpye => Book, book => book.chapters)
  book!: Book;

  @ManyToOne(type => User, user => user.chapters)
  user!: User;
}

export default Chapter;
