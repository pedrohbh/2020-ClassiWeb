import { Required } from "@tsed/schema";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { Advertising } from "./Advertising";

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "blob" })
  @Required()
  blob: Blob;

  @ManyToOne(() => Advertising, (ad) => ad.images)
  ad: Advertising;
}
