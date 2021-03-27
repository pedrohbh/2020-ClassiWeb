import { DateFormat, Enum, Property, Required } from "@tsed/schema";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Advertising } from "./Advertising";
import { User } from "./User";

export enum Feedback {
  EXCELLENT = "Muito Satisfeito",
  GOOD = "Satisfeito",
  NORMAL = "Normal",
  BAD = "Insatisfeito",
  TERRIBLE = "Muito Insatisfeito"
}

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  owner_feedback: Feedback;

  @Column()
  client_feedback: Feedback;

  @ManyToOne(() => User, (user) => user.purchases)
  client: User;

  @ManyToOne(() => Advertising, (ad) => ad.purchases)
  ad: Advertising;
}
