import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Timestamp extends BaseEntity {
  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated: Date;
}
