export interface ICRUD<T> {
  GetAll() : Promise<T[]>

  Get(id: string) : Promise<T>;

  Create(data: Omit<T, 'id'>): Promise<T>;

  Update(data: T) : Promise<T>

  Detele(id: string) : Promise<void>
}
