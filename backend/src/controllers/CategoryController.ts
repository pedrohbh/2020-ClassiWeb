import { BodyParams, Controller, Delete, Get, HeaderParams, Inject, PathParams, Post } from '@tsed/common';
import { BadRequest, NotFound } from '@tsed/exceptions';
import { Authorize } from '@tsed/passport';
import { EntityNotFoundError } from 'typeorm';

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
    if (! category.name) throw new BadRequest('Campo nome não preenchido');
    return this.categoryService.CreateCategory(category);
  }

  @Delete('/:name')
  @Roles([UserTypes.ADMIN])
  @Authorize('jwt')
  async Delete(@HeaderParams('auth') auth: string, @PathParams('name') name: string): Promise<void> {
    try {
      await this.categoryService.DeleteCategory(name);
    } catch (error) {
      if (error instanceof EntityNotFoundError) throw new NotFound('Categoria não encontrada');
    }
  }
}
