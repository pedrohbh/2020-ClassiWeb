import {
    Entity,
    Column,
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
  
  @Entity()
  export class Category {
    @Column()
    @IsNotEmpty()
    name: string;
  
    @Column()
    @IsNotEmpty()
    description: string;
  }