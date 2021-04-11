import { Inject, Service } from '@tsed/di';

import { ImageDAO } from '../../persistence/ImageDAO';

@Service()
export class ImageService {
  @Inject(ImageDAO)
  private readonly dao: ImageDAO;

  ListImages() {
    return this.dao.ReadAll();
  }

  SaveImage(base64: any) {
    return this.dao.Create(base64);
  }

  async GetImageById(id: string) {
    return this.dao.Read(id);
  }
}
