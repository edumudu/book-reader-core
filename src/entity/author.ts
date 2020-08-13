import BaseModel from './baseModel';
import { Entity, Column, OneToMany } from 'typeorm';
import Book from './book';

@Entity({
  name: 'authors',
})
class Author extends BaseModel {
  @Column({ unique: true })
  name!: string;

  @OneToMany(type => Book, book => book.artist)
  books!: Book[];
}

export default Author;
