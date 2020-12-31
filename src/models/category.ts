import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import BaseModel from './baseModel';

import Book from './book';

@Entity({ name: 'categories' })
class Category extends BaseModel {
  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Book, book => book.categories)
  @JoinTable()
  books!: Book[];
}

export default Category;
