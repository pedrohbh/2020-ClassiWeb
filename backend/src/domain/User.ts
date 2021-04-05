import {
  Email, Maximum, MaxLength, MinLength, Property, Required,
} from '@tsed/schema';

import bcrypt from 'bcrypt';
import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique,
} from 'typeorm';

import { Address } from './Address';
import { Advertising } from './Advertising';
import { Purchase } from './Purchase';

@Entity()
@Unique(['cpf', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Property()
  id: string;

  @Column()
  @Maximum(40)
  @Required()
  name: string;

  @Column({ length: 11 })
  @MaxLength(11)
  @MinLength(11)
  @Required()
  cpf: string;

  @Property(Address)
  @ManyToOne(() => Address, (address) => address.users)
  address: Address;

  @Column()
  @Email()
  @Required()
  email: string;

  @Column()
  @Maximum(100)
  @MinLength(8)
  @Required()
  password: string;

  @OneToMany(() => Advertising, (ad) => ad.owner)
  ads: Advertising[];

  @ManyToMany(() => Advertising)
  @JoinTable()
  wishes_list: Advertising[];

  @OneToMany(() => Purchase, (purchase) => purchase.client)
  purchases: Purchase[];

  static GetFormmatedCpf(cpf: string) {
    let index = 0;
    // eslint-disable-next-line no-plusplus
    return '___.___.___-__'.replace(/_/g, () => cpf[index++]);
  }

  static GetEncryptedPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  }

  isValidPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
