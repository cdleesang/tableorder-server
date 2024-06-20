import { StoreService } from './store.service';
import { GetAllSlideImagesResponse } from './types/store-response.type';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    getAllSlideImages(): Promise<GetAllSlideImagesResponse>;
}
