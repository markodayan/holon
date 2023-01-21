import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  // 66 = 64 length (32 bytes) + 2 for '0x'
  @PrimaryColumn({
    unique: true,
    length: 66,
  })
  hash: string;

  @Column()
  block_hash: string;

  @Column({
    unique: true,
  })
  block_number: string;

  @Column()
  chain_id: number;

  @Column()
  from: string;

  @Column()
  gas: number;

  @Column()
  gas_price: number;

  @Column()
  input: string;

  @Column()
  nonce: string;

  @Column()
  r: string;

  @Column()
  s: string;

  @Column()
  to: string;

  @Column()
  transaction_index: number;

  @Column()
  type: number;

  @Column()
  v: string;

  @Column()
  value: number;
}

export default Transaction;
