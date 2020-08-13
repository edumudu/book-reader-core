import BaseModel from './baseModel';
import { Entity, Column, ManyToMany } from 'typeorm';
import Book from './book';

@Entity({
  name: 'categories',
})
class Category extends BaseModel {
  @Column({ unique: true })
  name!: string;

  @ManyToMany(type => Book, book => book.categories)
  books!: Book[];
}

export default Category;
