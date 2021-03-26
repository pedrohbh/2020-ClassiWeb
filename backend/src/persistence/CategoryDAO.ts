import { Injectable, } from "@tsed/di";
import { EntityRepository, Repository } from "typeorm";
import { Category } from "../domain/Category";
import {IBaseDAO} from "./BaseDAO";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {}

@Injectable()
export class CategoryDAO implements Partial<IBaseDAO<Category>> {
  constructor(private readonly repository: CategoryRepository) {}

  Create(category: Omit<Category, "id">) {
    return this.repository.save(category);
  }

  ReadAll() {
    return this.repository.find();
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id);
  }
}
