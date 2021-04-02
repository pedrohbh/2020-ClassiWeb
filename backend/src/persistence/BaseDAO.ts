import { FindManyOptions } from 'typeorm';

export interface IBaseDAO<T> {
  Create(data: unknown): Promise<T>;

  ReadAll(options?: FindManyOptions<T>): Promise<T[]>;
  Read(id: string): Promise<T>;

  Update(data: T): Promise<T>;

  Delete(id: string): Promise<any>;
}
