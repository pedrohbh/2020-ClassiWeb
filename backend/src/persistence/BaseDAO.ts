export interface IBaseDAO<T> {
  Create(data: Omit<T, 'id'>): Promise<T>;

  ReadAll(): Promise<T[]>;
  Read(id: string): Promise<T>;

  Update(data: T): Promise<T>;

  Delete(id: string): Promise<T>;
}
