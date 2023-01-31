import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('receipt')
class Receipt extends BaseEntity {
  @PrimaryColumn({
    unique: true,
    length: 66, // 66 chars = 64 chars (32 byte hash) + 2 chars ('0x')
  })
  transactionHash: string;

  @Column()
  blockNumber: number;

  @Column({ nullable: true })
  contractAddress: string;

  @Column()
  cumulativeGasUsed: number;

  @Column()
  effectiveGasPrice: number;

  @Column()
  from: string;

  @Column()
  gasUsed: number;

  @Column('simple-array', { nullable: true })
  logs: string[];
  // logs: TransactionLogItem[];

  @Column()
  logsBloom: string;

  @Column()
  status: string;

  @Column()
  to: string;

  @Column()
  transactionIndex: number;

  @Column()
  type: number;
}

export default Receipt;
