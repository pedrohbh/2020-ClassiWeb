import { PlatformMulterFile } from '@tsed/common';
import { Inject, Service } from '@tsed/di';

import { Image } from '../domain/Image';
import { AdvertisingDAO } from '../persistence/AdvertisingDAO';
import { ImageDAO } from '../persistence/ImageDAO';

@Service()
export class ImageService {
  @Inject(ImageDAO)
  private readonly dao: ImageDAO;

  @Inject(AdvertisingDAO)
  private readonly adDao: AdvertisingDAO;

  GetImageDTO(image: Image) {
    return {
      id: image.id,
      blob: image.blob,
    };
  }

  async ListImages() {
    const images = await this.dao.ReadAll();

    return images.map((image) => this.GetImageDTO(image));
  }

  async SaveImage(image: PlatformMulterFile, adId: string) {
    const ad = await this.adDao.Read(adId);
    const { id } = await this.dao.Create({ blob: image, ad });

    return id;
  }

  async GetImageById(id: string) {
    const image = await this.dao.Read(id);

    return this.GetImageDTO(image);
  }

  async DeleteImage(id: string) {
    await this.dao.Delete(id);
  }
}
