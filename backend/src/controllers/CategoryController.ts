import { BodyParams, Controller, Delete, Get, HeaderParams, Inject, PathParams, Post } from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { CategoryService } from '../application/CategoryService';
import { Category } from '../domain/Category';
import { UserTypes } from '../domain/User';
import { Roles } from '../middlewares/Roles';

@Controller('/categories')
export class CategoryController {
  @Inject(CategoryService)
  private categoryService: CategoryService;

  @Get('/')
  GetAll(): Promise<Category[]> {
    return this.categoryService.ListAllCategories();
  }

  @Post('/')
  @Roles([UserTypes.ADMIN])
  @Authorize('jwt')
  Post(@HeaderParams('auth') auth: string, @BodyParams(Category) category: Category): Promise<Category> {
    return this.categoryService.CreateCategory(category);
  }

  @Delete('/:name')
  @Roles([UserTypes.ADMIN])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('name') name: string): Promise<void> {
    await this.categoryService.Delete(name);
  }
}
