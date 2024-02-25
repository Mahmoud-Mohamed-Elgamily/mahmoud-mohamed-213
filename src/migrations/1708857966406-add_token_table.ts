import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTokenTable1708857966406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'token',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'index',
            type: 'varchar',
          },
          {
            name: 'contract_address',
            type: 'varchar',
          },
          {
            name: 'current_price',
            type: 'decimal(10,5)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('token');
  }
}
