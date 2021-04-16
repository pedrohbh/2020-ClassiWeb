import { Inject, Service } from '@tsed/di';

import { Category } from '../domain/Category';
import { CategoryDAO } from '../persistence/CategoryDAO';

@Service()
export class CategoryService {
  @Inject(CategoryDAO)
  private readonly dao: CategoryDAO;

  CreateCategory(category: Omit<Category, 'id'>) {
    return this.dao.Create(category);
  }

  ListAllCategories() {
    return this.dao.ReadAll();
  }

  async DeleteCategory(name: string): Promise<void> {
    await this.dao.Delete(name);
  }
}
