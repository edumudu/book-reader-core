import { Entity, Column } from 'typeorm';

import BaseModel from './baseModel';

@Entity({ name: 'categories' })
class Category extends BaseModel {
  @Column({ unique: true })
  name!: string;
}

export default Category;
