import { Entity, Column } from 'typeorm';

import BaseModel from './baseModel';
import Category from './category';
import Chapter from './chapter';
import Author from './author';
import Artist from './artist';

@Entity({ name: 'books' })
class Book extends BaseModel {
  @Column({ unique: true })
  title!: string;

  @Column()
  description!: string;

  @Column()
  type!: 'novel' | 'manga';
}

export default Book;
