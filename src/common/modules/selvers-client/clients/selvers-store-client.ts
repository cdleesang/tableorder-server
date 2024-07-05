import { TOrderMainImagesResponse } from '../types/selvers-store-response.type';
import { responseErrorHandle } from '../utils/response-error-handle.util';
import { SelversWWWClient } from './selvers-www-client';

export class SelversStoreClient extends SelversWWWClient {
  /**
   * 상점의 티오더 메인 이미지 조회
   */
  async getStoreTOrderMainImages(storeId: string) {
    const url = this.genFullPath('/api/tableOrder/v2/getStoreTOrderMainImages.json');

    return await responseErrorHandle(
      '슬라이드 이미지 조회',
      this.httpService.get<TOrderMainImagesResponse>(url, {
        params: {
          store_id: storeId,
        },
      }),
    );
  }
}