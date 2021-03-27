import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Advertising } from './Advertising';

@Entity()
export class Category {
  @PrimaryColumn()
  name: string;

  @OneToMany(() => Advertising, (ad) => ad.category)
  ads: Advertising[];
}
