import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

import Transaction from './base/Transaction';

class LegacyTransaction extends Transaction {}

class EIP2930Transaction extends Transaction {
  @Column()
  access_list: string[];
}

class EIP1559Transaction extends Transaction {
  @Column()
  access_list: string[];

  @Column()
  max_fee_per_gas: number;

  @Column()
  max_priority_fee_per_gas: number;
}

export { LegacyTransaction, EIP2930Transaction, EIP1559Transaction };
