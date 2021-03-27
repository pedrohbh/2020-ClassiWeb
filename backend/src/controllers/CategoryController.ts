import { BodyParams, Controller, Get, Inject, Post } from '@tsed/common';

import { CategoryService } from '../application/CategoryService';
import { ICategoryService } from '../application/interfaces/ICategoryService';
import { Category } from '../domain/Category';

@Controller('/categories')
export class CategoryController {
  @Inject(CategoryService)
  private categoryService: ICategoryService;

  @Get('/')
  GetAll(): Promise<Category[]> {
    return this.categoryService.ListAllCategories();
  }

  @Post('/')
  Post(@BodyParams() category: Omit<Category, 'id'>): Promise<Category> {
    return this.categoryService.CreateCategory(category);
  }
}
