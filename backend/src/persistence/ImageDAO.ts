import { Injectable } from '@tsed/di';

import { DeepPartial, EntityRepository, Repository } from 'typeorm';

import { Image } from '../domain/Image';

@EntityRepository(Image)
class ImageRepository extends Repository<Image> {}

@Injectable()
export class ImageDAO {
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

  Delete(id: string) {
    return this.repository.delete(id);
  }
}
