import { HttpService } from '@nestjs/axios';
import { SelversAuthClient } from './clients/selvers-auth-client';
import { SelversCartClient } from './clients/selvers-cart-client';
import { SelversEasycallClient } from './clients/selvers-easycall-client';
import { SelversFoodClient } from './clients/selvers-food-client';
import { SelversStoreClient } from './clients/selvers-store-client';
import { SelversOrderClient } from './clients/selvers-order-client';
export declare class SelversClientService {
    readonly httpService: HttpService;
    auth: SelversAuthClient;
    cart: SelversCartClient;
    easycall: SelversEasycallClient;
    food: SelversFoodClient;
    store: SelversStoreClient;
    order: SelversOrderClient;
    constructor(httpService: HttpService);
}
