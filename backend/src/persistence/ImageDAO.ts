import { Injectable } from '@tsed/di';

import { DeepPartial, EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { Image } from '../domain/Image';
import { IBaseDAO } from './BaseDAO';

@EntityRepository(Image)
class ImageRepository extends Repository<Image> {}

@Injectable()
export class ImageDAO implements Omit<IBaseDAO<Image>, 'ReadWith' | 'Update'> {
  constructor(private readonly repository: ImageRepository) {}

  Create(image: DeepPartial<Image>) {
    return this.repository.save(image);
  }

  ReadAll() {
    return this.repository.find();
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id);
  }

  ReadWith(options: FindManyOptions<Image>) {
    return this.repository.find(options);
  }

  async Delete(id: string) {
    await this.repository.delete(id);
  }
}
