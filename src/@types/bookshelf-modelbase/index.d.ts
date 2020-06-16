// import Bookshelf from 'bookshelf';

declare module 'bookshelf-modelbase' {
  import Bookshelf from 'bookshelf';

  export function pluggable(bookshelf: Bookshelf, params): void;
}
