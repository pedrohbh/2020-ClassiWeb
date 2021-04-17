import { Required } from '@tsed/schema';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Advertising } from './Advertising';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Required()
  filename: string;

  @ManyToOne(() => Advertising, (ad) => ad.images)
  ad: Advertising;
}
