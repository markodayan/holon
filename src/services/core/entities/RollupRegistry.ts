import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class RollupRegistry extends BaseEntity {
  @PrimaryColumn({
    unique: true,
  })
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;
}

export default RollupRegistry;
