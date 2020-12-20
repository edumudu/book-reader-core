import BaseModel from './baseModel';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'categories' })
class Category extends BaseModel {
  @Column({ unique: true })
  name!: string;
}

export default Category;
