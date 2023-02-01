import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Rollup from './Rollup';

@Entity()
class Address extends BaseEntity {
  @PrimaryColumn({
    unique: true,
    length: 42, // 42 chars = 40 chars (20 byte address) + 2 chars ('0x')
  })
  address: string;

  @Column()
  label: string;

  @ManyToOne(() => Rollup, (rollup) => rollup.addresses)
  rollup: Rollup;

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated: Date;
}

export default Address;
