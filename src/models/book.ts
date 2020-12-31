import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';

import BaseModel from './baseModel';
import Chapter from './chapter';
import Artist from './artist';
import Author from './author';
import Category from './category';

@Entity({ name: 'books' })
class Book extends BaseModel {
  @Column({ unique: true })
  title!: string;

  @Column()
  description!: string;

  @Column()
  type!: 'novel' | 'manga';

  @OneToMany(() => Chapter, chaper => chaper.book)
  chapters!: Book[];

  @ManyToMany(() => Artist, artist => artist.books)
  artists!: Artist[];

  @ManyToMany(() => Author, author => author.books)
  authors!: Author[];

  @ManyToMany(() => Category, category => category.books)
  categories!: Category[];
}

export default Book;
