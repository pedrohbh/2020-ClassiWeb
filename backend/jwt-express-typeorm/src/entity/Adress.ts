import {
    Entity,
    Column,
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
  
  @Entity()
  export class Adress {
    @Column()
    @IsNotEmpty()
    state: string;
  
    @Column()
    @IsNotEmpty()
    city: string;
  }
