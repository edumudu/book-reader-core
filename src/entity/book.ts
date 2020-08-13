import { Entity, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import BaseModel from './baseModel';
import Category from './category';
import Chapter from './chapter';
import Author from './author';
import Artist from './artist';

@Entity({
  name: 'books',
})
class Book extends BaseModel {
  @Column({ unique: true })
  name!: string;

  @Column('text')
  sinopse!: string;

  @Column()
  type!: 'novel' | 'manga';

  @Column('boolean')
  is_visible!: boolean;

  @ManyToOne(type => Author, author => author.books)
  author!: Author;

  @ManyToOne(type => Artist, artist => artist.books)
  artist!: Artist;

  @ManyToMany(type => Category, category => category.books)
  @JoinTable()
  categories!: Category[];

  @OneToMany(type => Chapter, chapter => chapter.book)
  chapters!: Chapter[];
}

export default Book;
