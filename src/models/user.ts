import { Entity, Column, OneToMany } from 'typeorm';

import BaseModel from './baseModel';
import Organization from './organization';

@Entity({ name: 'users' })
class User extends BaseModel {
  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  role!: 'admin' | 'mod' | 'user';

  @OneToMany(() => Organization, organization => organization.user)
  organizations!: Organization[];
}

export default User;
