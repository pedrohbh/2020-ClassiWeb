import { Email, Maximum, Minimum, Property, Required } from "@tsed/schema";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Address } from "./Address";
import bcrypt from "bcrypt";
import { Advertising } from "./Advertising";
import { Purchase } from "./Purchase";

@Entity()
@Unique(["cpf", "email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id: number;

  @Column()
  @Maximum(40)
  @Required()
  name: string;

  @Column({ length: 11 })
  @Required()
  cpf: string;

  @ManyToOne(() => Address, (address) => address.users)
  address: Address;

  @Column()
  @Email()
  @Required()
  email: string;

  @Column()
  @Maximum(100)
  @Minimum(8)
  @Required()
  password: string;

  @OneToMany(() => Advertising, (ad) => ad.onwer)
  ads: Advertising[];

  @ManyToMany(() => Advertising)
  @JoinTable()
  wishes_list: Advertising[];

  @OneToMany(() => Purchase, (purchase) => purchase.client)
  purchases: Purchase[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isValidPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
