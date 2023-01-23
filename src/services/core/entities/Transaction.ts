import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryColumn({
    unique: true,
    length: 66,
  })
  hash: string;
  // 66 = 64 length (32 bytes) + 2 for '0x'

  // For 2930 and 1559 TXs only
  @Column('simple-array', { nullable: true })
  access_list: string[];

  @Column()
  blockHash: string;

  @Column({
    unique: true,
  })
  blockNumber: string;

  @Column()
  chainId: number;

  @Column()
  from: string;

  @Column()
  gas: number;

  @Column()
  gasPrice: number;

  @Column()
  input: string;

  // For 1559 TXs only
  @Column({ nullable: true })
  max_fee_per_gas: number;

  // For 1559 TXs only
  @Column({ nullable: true })
  max_priority_fee_per_gas: number;

  @Column()
  nonce: string;

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

  @Column()
  value: number;
}

export default Transaction;
