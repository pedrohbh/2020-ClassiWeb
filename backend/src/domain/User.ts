import bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, Unique,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  NORMAL = 'normal',
  GHOST = 'ghost'
}

@Entity()
@Unique(['cpf', 'email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsNotEmpty()
    role: UserRole;

    @Column()
    @Length(4, 40)
    name: string;

    @Column()
    @Length(11, 11)
    cpf: string;

    @Column()
    address: number;

    @Column()
    @IsNotEmpty()
    email: string;

    @Column()
    @Length(8, 100)
    password: string;

    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }

    isValidPassword(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
