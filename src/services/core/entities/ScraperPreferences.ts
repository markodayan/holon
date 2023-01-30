import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class ScraperPreferences extends BaseEntity {
  @PrimaryColumn({
    unique: true,
  })
  id: number;
}

export default ScraperPreferences;
