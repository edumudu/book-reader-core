import { Entity, Column, OneToMany } from 'typeorm';

import BaseModel from './baseModel';
import Chapter from './chapter';

@Entity({ name: 'languages' })
class Language extends BaseModel {
  @Column()
  id!: number;

  @Column()
  name!: string;

  @Column()
  unicode!: string;

  @OneToMany(() => Chapter, chapter => chapter.language)
  chapters!: Chapter[];
}

export default Language;
