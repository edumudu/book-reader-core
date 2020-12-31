import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCategoriesBooks1609441300375 implements MigrationInterface {
  private tableName = 'categories_books_books';

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'categoriesId',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'booksId',
            type: 'integer',
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            name: 'categoriesPivot_categoriesId_categoriesTable',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['categoriesId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'categoriesPivot_bookId_bookTable',
            referencedTableName: 'books',
            referencedColumnNames: ['id'],
            columnNames: ['booksId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.tableName);
  }
}
