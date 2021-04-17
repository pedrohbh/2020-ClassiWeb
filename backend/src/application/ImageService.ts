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

  GetImageDTO({ id, filename }: Image) {
    return { id, filename };
  }

  async ListImages() {
    const images = await this.dao.ReadAll();

    return images.map((image) => this.GetImageDTO(image));
  }

  async SaveImage(image: Partial<Image>, adId: string) {
    const ad = await this.adDao.Read(adId);
    const newImage = await this.dao.Create({ ...image, ad });

    return this.GetImageDTO(newImage);
  }

  async GetImageById(id: string) {
    const image = await this.dao.Read(id);

    return this.GetImageDTO(image);
  }

  async DeleteImage(id: string) {
    const { filename } = await this.dao.Read(id);
    await this.dao.Delete(id);

    return filename;
  }
}
