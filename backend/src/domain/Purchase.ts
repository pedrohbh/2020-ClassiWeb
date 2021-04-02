import { Property } from '@tsed/schema';

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Advertising } from './Advertising';
import { User } from './User';

export enum Feedback {
  EXCELLENT = 'Muito Satisfeito',
  GOOD = 'Satisfeito',
  NORMAL = 'Normal',
  BAD = 'Insatisfeito',
  TERRIBLE = 'Muito Insatisfeito',
}

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  @Property()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'int8' })
  owner_feedback: Feedback;

  @Column({ type: 'int8' })
  client_feedback: Feedback;

  @ManyToOne(() => User, (user) => user.purchases)
  client: User;

  @ManyToOne(() => Advertising, (ad) => ad.purchases)
  ad: Advertising;
}
