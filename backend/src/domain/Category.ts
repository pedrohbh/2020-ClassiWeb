import { Property } from '@tsed/schema';

import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Advertising } from './Advertising';

@Entity()
export class Category {
  @PrimaryColumn()
  @Property()
  name: string;

  @OneToMany(() => Advertising, (ad) => ad.category)
  ads: Advertising[];
}
