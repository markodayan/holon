import { Entity, BaseEntity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import Flow from './Flow';

@Entity('transactions')
class Transaction extends BaseEntity implements TransactionBody {
  @PrimaryColumn({
    unique: true,
    length: 66, // 66 chars = 64 chars (32 byte hash) + 2 chars ('0x')
  })
  hash: string;

  // For 2930 and 1559 TXs only
  @Column('simple-array', { nullable: true })
  accessList: string[];

  @Column()
  blockHash: string;

  @Column({
    unique: true,
  })
  blockNumber: number;

  @Column()
  chainId: number;

  @Column()
  from: string;

  @Column({ type: 'real' })
  gas: number;

  @Column({ type: 'real' })
  gasPrice: number;

  @Column()
  input: string;

  // For 1559 TXs only
  @Column({ nullable: true, type: 'real' })
  maxFeePerGas: number;

  // For 1559 TXs only
  @Column({ nullable: true, type: 'real' })
  maxPriorityFeePerGas: number;

  @Column()
  nonce: number;

  @Column()
  r: string;

  @Column()
  s: string;

  @Column()
  to: string;

  @Column()
  transactionIndex: number;

  @Column()
  type: number;

  @Column()
  v: string;

  @Column({ type: 'real' })
  value: number;

  @ManyToOne(() => Flow, (flow) => flow.transactions)
  flow: Flow;
}

export default Transaction;
