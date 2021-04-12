import { Injectable } from '@tsed/di';

import { EntityRepository, Repository } from 'typeorm';

import { Image } from '../domain/Image';

@EntityRepository(Image)
class ImageRepository extends Repository<Image> {}

@Injectable()
export class ImageDAO {
  constructor(private readonly repository: ImageRepository) {}

  Create(base64: any) {
    return this.repository.save(base64);
  }

  ReadAll() {
    return this.repository.find();
  }

  Read(id: string) {
    return this.repository.findOneOrFail(id);
  }
}
