import { Entity, Column } from 'typeorm';

import BaseModel from './baseModel';

@Entity({ name: 'artists' })
class Artist extends BaseModel {
  @Column({ unique: true })
  name!: string;
}

export default Artist;
