import { Category } from '../../domain/Category';

export interface ICategoryService {
  CreateCategory(category: Omit<Category, 'id'>): Promise<Category>;

  ListAllCategories(): Promise<Category[]>;
}
