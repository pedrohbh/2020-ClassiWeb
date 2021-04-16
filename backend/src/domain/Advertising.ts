import { Minimum, Required } from '@tsed/schema';

import {
  Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { Address } from './Address';
import { Category } from './Category';
import { Image } from './Image';
import { Purchase } from './Purchase';
import { User } from './User';

export enum ProductState {
  NEW,
  SECONDHAND,
}

export enum AdvertisingState {
  VISIBLE,
  HIDDEN,
}

@Entity()
export class Advertising {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Required()
  title: string;

  @Column()
  @Required()
  description: string;

  @Column({ type: 'float' })
  @Minimum(0)
  @Required()
  price: number;

  @Column({ type: 'int' })
  @Minimum(0)
  @Required()
  quantity: number;

  @OneToMany(() => Image, (image) => image.ad)
  images: Image[];

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @Column({ type: 'int8' })
  @Required()
  product_state: ProductState;

  @ManyToOne(() => Address, (address) => address.ads)
  address: Address;

  @Column({ type: 'int8' })
  @Required()
  state: AdvertisingState;

  @ManyToOne(() => User, (user) => user.ads)
  owner: User;

  @OneToMany(() => Purchase, (purchase) => purchase.ad)
  purchases: Purchase[];

  @ManyToMany(() => User, (user) => user.wishes_list)
  wishes_list: User[];
}
