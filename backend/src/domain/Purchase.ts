import { Property } from '@tsed/schema';

import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { Advertising } from './Advertising';
import { User } from './User';

export enum Feedback {
  TERRIBLE = 1,
  BAD,
  NORMAL,
  GOOD,
  EXCELLENT,
}

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  @Property()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'int8', nullable: true })
  owner_feedback: Feedback;

  @Column({ type: 'int8', nullable: true })
  client_feedback: Feedback;

  @ManyToOne(() => User, (user) => user.purchases)
  client: User;

  @ManyToOne(() => Advertising, (ad) => ad.purchases)
  ad: Advertising;
}
