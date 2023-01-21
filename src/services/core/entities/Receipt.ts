import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('receipt')
class Receipt extends BaseEntity {
  // 66 = 64 length (32 bytes) + 2 for '0x'
  @PrimaryColumn({
    unique: true,
    length: 66,
  })
  transaction_hash: string;

  @Column()
  block_number: number;

  @Column()
  contract_address: string | null;

  @Column()
  cumulative_gas_used: number;

  @Column()
  effective_gas_price: number;

  @Column()
  from: string;

  @Column()
  gas_used: number;

  @Column()
  logs: TransactionLogItem[];

  @Column()
  logs_bloom: string;

  @Column()
  status: string;

  @Column()
  to: string;

  @Column()
  transaction_index: number;

  @Column()
  type: number;
}

export default Receipt;
