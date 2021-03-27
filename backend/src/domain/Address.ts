import { Property, Required } from '@tsed/schema';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Advertising } from './Advertising';
import { User } from './User';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @Property()
  id: number;

  @Column({ length: 2 })
  @Required()
  state: string;

  @Column()
  @Required()
  city: string;

  @OneToMany(() => User, (user) => user.address)
  users: User[];

  @OneToMany(() => Advertising, (ad) => ad.address)
  ads: Advertising[];
}
