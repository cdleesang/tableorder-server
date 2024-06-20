import { TOrderMainImagesResponse } from '../types/selvers-store-response.type';
import { SelversWWWClient } from './selvers-www-client';
export declare class SelversStoreClient extends SelversWWWClient {
    getStoreTOrderMainImages(storeId: string): Promise<TOrderMainImagesResponse>;
}
