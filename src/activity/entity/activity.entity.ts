import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('activity')
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contract_address: string;

  @Column()
  token_index: string;

  @Column()
  listing_price: number;

  @Column()
  maker: string;

  @Column()
  listing_from: Date;

  @Column()
  listing_to: Date;

  @Column()
  event_timestamp: Date;
}
