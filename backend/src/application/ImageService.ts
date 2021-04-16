import { PlatformMulterFile } from '@tsed/common';
import { Inject, Service } from '@tsed/di';

import { AdvertisingDAO } from '../persistence/AdvertisingDAO';
import { ImageDAO } from '../persistence/ImageDAO';

@Service()
export class ImageService {
  @Inject(ImageDAO)
  private readonly dao: ImageDAO;

  @Inject(AdvertisingDAO)
  private readonly adDao: AdvertisingDAO;

  async ListImages() {
    const images = await this.dao.ReadAll();
    return images.map((image) => ({ ...image }));
  }

  async SaveImage(image: PlatformMulterFile, adId: string) {
    const ad = await this.adDao.Read(adId);
    const newImage = await this.dao.Create({ blob: image, ad });

    return newImage.id;
  }

  async GetImageById(id: string) {
    const image = await this.dao.Read(id);
    return { ...image };
  }

  async DeleteImage(id: string) {
    return this.dao.Delete(id);
  }
}
