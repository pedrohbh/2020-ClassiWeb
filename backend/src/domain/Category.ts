import { Property, Required } from "@tsed/schema";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id: number;

  @Column()
  @Required()
  name: string;
}
