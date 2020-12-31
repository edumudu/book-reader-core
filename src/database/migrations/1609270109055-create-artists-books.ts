import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createArtistsBooks1609270109055 implements MigrationInterface {
  private tableName = 'artists_books_books';

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'artistsId',
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
            name: 'artistsPivot_artistId_artistTable',
            referencedTableName: 'artists',
            referencedColumnNames: ['id'],
            columnNames: ['artistsId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'artistsPivot_bookId_bookTable',
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
