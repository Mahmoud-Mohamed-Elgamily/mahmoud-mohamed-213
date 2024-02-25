import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('token')
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  index: string;

  @Column()
  contract_address: string;

  @Column({ type: 'decimal', nullable: true })
  current_price: number;
}
