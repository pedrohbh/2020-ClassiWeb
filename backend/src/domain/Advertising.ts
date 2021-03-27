import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./Address";
import { Category } from "./Category";
import { User } from "./User";
import { Purchase } from "./Purchase";
import { Minimum, Required } from "@tsed/schema";
import { Image } from "./Image";

export enum ProductState {
  NEW,
  SECONDHAND
}

export enum AdvertisingState {
  VISIBLE,
  HIDDEN
}

@Entity()
export class Advertising {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Required()
  title: string;

  @Column()
  @Required()
  description: string;

  @Column({ type: "float" })
  @Minimum(0)
  @Required()
  price: number;

  @Column({ type: "int" })
  @Minimum(0)
  @Required()
  quantity: number;

  @OneToMany(() => Image, (image) => image.ad)
  images: Image[];

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @Column()
  @Required()
  product_state: ProductState;

  @ManyToOne(() => Address, (address) => address.ads)
  address: Address;

  @Column()
  @Required()
  state: AdvertisingState;

  @ManyToOne(() => User, (user) => user.ads)
  onwer: User;

  @OneToMany(() => Purchase, (purchase) => purchase.ad)
  purchases: Purchase[];
}
