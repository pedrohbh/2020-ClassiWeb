import { FindManyOptions } from 'typeorm';

export interface IBaseDAO<T> {
  Create(data: Partial<T>): Promise<T>;

  ReadAll(): Promise<T[]>;
  ReadWith(options?: FindManyOptions<T>): Promise<T[]>;
  Read(id: string): Promise<T>;

  Update(id: string, data: Partial<T>): Promise<void>;

  Delete(id: string): Promise<void>;
}
