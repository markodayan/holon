import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Account from './Account';
import Transaction from './Transaction';

@Entity('flows')
class Flow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.address, { nullable: true })
  @JoinColumn({
    name: 'from_address',
  })
  from: Account;

  @ManyToOne(() => Account, (account) => account.address, { nullable: true })
  @JoinColumn({
    name: 'to_address',
  })
  to: Account;

  @Column({ nullable: true })
  abi: string;

  @OneToMany(() => Transaction, (transaction) => transaction.flow)
  transactions: Transaction[];
}

export default Flow;
