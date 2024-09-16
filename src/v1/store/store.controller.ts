import { TypedRoute } from '@nestia/core';
import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { GetAllSlideImagesDto } from './dto';
import { StoreService } from './store.service';

@Controller({path: 'store', version: VERSION_NEUTRAL})
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  /**
   * 슬라이드 이미지 조회.
   * 
   * @tag 상점
   */
  @TypedRoute.Get('slide-image')
  async getAllSlideImages(): Promise<GetAllSlideImagesDto.Response> {
    return this.storeService.getAllSlideImages();
  }
}