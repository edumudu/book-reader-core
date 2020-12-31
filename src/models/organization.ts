import { Entity, Column, ManyToOne } from 'typeorm';

import BaseModel from './baseModel';
import User from './user';

@Entity({ name: 'organizations' })
class Organization extends BaseModel {
  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.organizations)
  user!: User;
}

export default Organization;
