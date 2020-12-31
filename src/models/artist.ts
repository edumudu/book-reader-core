import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import BaseModel from './baseModel';
import Book from './book';

@Entity({ name: 'artists' })
class Artist extends BaseModel {
  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Book, book => book.artists)
  @JoinTable()
  books!: Book[];
}

export default Artist;
