import { Entity, Column } from 'typeorm';

import BaseModel from './baseModel';

@Entity({ name: 'authors' })
class Author extends BaseModel {
  @Column({ unique: true })
  name!: string;
}

export default Author;
