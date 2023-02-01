import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class Constraints {
  @PrimaryColumn({
    unique: true,
  })
  id: number;
}

export default Constraints;
