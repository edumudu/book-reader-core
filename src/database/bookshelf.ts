import knex from './connection';
import Bookshelf from 'bookshelf';
import ModelBase from 'bookshelf-modelbase';

const bookshelf = Bookshelf(knex);
bookshelf.plugin(ModelBase.pluggable);

export default bookshelf;
