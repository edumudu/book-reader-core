import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAuthorsBooks1609278941922 implements MigrationInterface {
  private tableName = 'authors_books_books';

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'authorsId',
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
            name: 'authorsPivot_authorstId_authorsTable',
            referencedTableName: 'authors',
            referencedColumnNames: ['id'],
            columnNames: ['authorsId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'authorsPivot_bookId_bookTable',
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
