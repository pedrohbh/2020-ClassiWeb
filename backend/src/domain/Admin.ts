import { Email, Maximum, Minimum, Property, Required } from "@tsed/schema";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
@Unique(["registration", "email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id: number;

  @Column()
  @Maximum(40)
  @Required()
  name: string;

  @Column()
  @Required()
  registration: string;

  @Column()
  @Email()
  @Required()
  email: string;

  @Column()
  @Maximum(100)
  @Minimum(8)
  @Required()
  password: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isValidPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
