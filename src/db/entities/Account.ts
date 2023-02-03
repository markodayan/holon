import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Rollup from './Rollup';

@Entity('accounts')
class Account extends BaseEntity {
  @PrimaryColumn({
    unique: true,
    length: 42, // 42 chars = 40 chars (20 byte address) + 2 chars ('0x')
  })
  address: string;

  @Column()
  label: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: false,
  })
  is_contract: boolean;

  // FK (rollupId)
  @ManyToOne(() => Rollup, (rollup) => rollup.accounts)
  rollup: Rollup;
}

export default Account;
