import { BodyParams, Controller, Get, HeaderParams, Inject, Post } from '@tsed/common';
import { Authorize } from '@tsed/passport';

import { CategoryService } from '../application/CategoryService';
import { ICategoryService } from '../application/interfaces/ICategoryService';
import { Category } from '../domain/Category';

@Controller('/categories')
export class CategoryController {
  @Inject(CategoryService)
  private categoryService: ICategoryService;

  @Get('/')
  @Authorize('jwt')
  GetAll(@HeaderParams('auth') auth: string): Promise<Category[]> {
    return this.categoryService.ListAllCategories();
  }

  @Post('/')
  Post(@BodyParams() category: Omit<Category, 'id'>): Promise<Category> {
    return this.categoryService.CreateCategory(category);
  }
}
