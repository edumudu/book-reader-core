import BaseModel from './baseModel';
import { Entity, Column, OneToMany } from 'typeorm';
import Book from './book';

@Entity({
  name: 'artists',
})
class Artist extends BaseModel {
  @Column({ unique: true })
  name!: string;

  @OneToMany(type => Book, book => book.artist)
  books!: Book[];
}

export default Artist;
