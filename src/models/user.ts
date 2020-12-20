import { Entity, Column } from 'typeorm';

import BaseModel from './baseModel';

@Entity({ name: 'users' })
class User extends BaseModel {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  role!: 'admin' | 'mod' | 'user';
}

export default User;
