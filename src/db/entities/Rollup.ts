import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Account from './Account';

@Entity('rollups')
class Rollup extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    unique: true,
  })
  label: string;

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => Account, (account) => account.rollup)
  accounts: Account[];
}

export default Rollup;
