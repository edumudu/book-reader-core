import BaseModel from './baseModel';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'authors' })
class Author extends BaseModel {
  @Column({ unique: true })
  name!: string;
}

export default Author;
