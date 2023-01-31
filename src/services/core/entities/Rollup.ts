import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Address from './Address';

@Entity()
class Rollup extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Address, (address) => address.rollup)
  addresses: Address[];

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated: Date;
}

export default Rollup;
