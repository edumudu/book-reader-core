import { Entity, Column, OneToMany } from 'typeorm';
import BaseModel from './baseModel';
import Chapter from './chapter';

@Entity({
  name: 'users',
})
class User extends BaseModel {
  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @OneToMany(type => Chapter, chapter => chapter.user)
  chapters!: Chapter[];
}

export default User;
