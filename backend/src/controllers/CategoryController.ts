import {
  BodyParams, Controller, Delete, Get, HeaderParams, Inject, PathParams, Post,
} from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { CategoryService } from '../application/classes/CategoryService';
import { Category } from '../domain/Category';

@Controller('/categories')
export class CategoryController {
  @Inject(CategoryService)
  private categoryService: CategoryService;

  @Get('/')
  // @Authorize('jwt')
  GetAll(@HeaderParams('auth') auth: string): Promise<Category[]> {
    return this.categoryService.ListAllCategories();
  }

  @Post('/')
  Post(@BodyParams() category: Omit<Category, 'id'>): Promise<Category> {
    return this.categoryService.CreateCategory(category);
  }

  @Delete('/:name')
  async Delete(@PathParams('name') name: string): Promise<void> {
    await this.categoryService.Delete(name);
  }
}
