import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('receipts')
class Receipt extends BaseEntity implements ReceiptBody {
  @PrimaryColumn({
    unique: true,
    length: 66, // 66 chars = 64 chars (32 byte hash) + 2 chars ('0x')
  })
  transactionHash: string;

  @Column()
  blockHash: string;

  @Column({ unique: false })
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
