import { FindManyOptions } from 'typeorm';
import { User } from '../../domain/User';
import { UserDTO } from '../UserService';

export interface IUserService {
  CreateUser(user: UserDTO): Promise<User>;

  GetUserById(id: string): Promise<User>;

  ListAllUsers(): Promise<User[]>;

  ListUsersWith(options: FindManyOptions<User>): Promise<User[]>;

  DeleteUser(id: string): Promise<void>;
}
