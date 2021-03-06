import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import BaseModel from './baseModel';
import Book from './book';

@Entity({ name: 'authors' })
class Author extends BaseModel {
  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Book, book => book.authors)
  @JoinTable()
  books!: Book[];
}

export default Author;
