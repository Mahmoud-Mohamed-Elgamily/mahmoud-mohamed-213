import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddActivityTable1708857939326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'contract_address',
            type: 'varchar',
          },
          {
            name: 'token_index',
            type: 'varchar',
          },
          {
            name: 'listing_price',
            type: 'decimal',
          },
          {
            name: 'maker',
            type: 'varchar',
          },
          {
            name: 'listing_from',
            type: 'datetime',
          },
          {
            name: 'listing_to',
            type: 'datetime',
          },
          {
            name: 'event_timestamp',
            type: 'datetime',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activity');
  }
}
