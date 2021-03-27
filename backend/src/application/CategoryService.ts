import { Inject, Service } from '@tsed/di';

import { Category } from '../domain/Category';
import { IBaseDAO } from '../persistence/BaseDAO';
import { CategoryDAO } from '../persistence/CategoryDAO';

@Service()
export class CategoryService {
  @Inject(CategoryDAO)
  private readonly dao: IBaseDAO<Category>;

  CreateCategory(category: Omit<Category, 'id'>) {
    return this.dao.Create(category);
  }

  ListAllCategories() {
    return this.dao.ReadAll();
  }
}
