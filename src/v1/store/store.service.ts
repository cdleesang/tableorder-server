import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SelversClientService } from '../../common/modules/selvers-client';
import { ConfigService } from '../../config';
import { NotificationService } from '../notification/notification.service';
import { GetAllSlideImagesDto } from './dto';

@Injectable()
export class StoreService implements OnModuleInit {
  private slideImageUrls: string[] = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly selversClientService: SelversClientService,
    private readonly notificationService: NotificationService,
  ) {}

  async onModuleInit() {
    await this.setSlideImageUrls();
  }

  // 1분마다 슬라이드 업데이트
  @Cron('* * * * *')
  private async setSlideImageUrls() {
    const storeId = this.configService.get('STORE_ID');
    
    const data = await this.selversClientService.store.getStoreTOrderMainImages(storeId);
    const prevSlideImageUrls = this.slideImageUrls;

    this.slideImageUrls = data.data
      .sort((a, b) => (parseInt(a.ranking, 10) > parseInt(b.ranking, 10) ? 1 : -1))
      .map(({s3_url}) => s3_url);

    const isSlideImageChanged = prevSlideImageUrls.length !== this.slideImageUrls.length
      || prevSlideImageUrls.some((value, index) => value !== this.slideImageUrls[index]);

    if(isSlideImageChanged) {
      this.notificationService.sendNotification({
        type: 'SlideImageChanged',
        data: this.slideImageUrls,
      });
    }
  }

  async getAllSlideImages(): Promise<GetAllSlideImagesDto.Response> {
    return { imageUrls: this.slideImageUrls };
  }
}