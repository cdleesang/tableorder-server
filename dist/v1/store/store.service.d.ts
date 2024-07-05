import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { NotificationService } from '../notification/notification.service';
import { GetAllSlideImagesResponse } from './types/store-response.type';
import { SelversClientService } from '../../common/modules/selvers-client/selvers-client.service';
export declare class StoreService implements OnModuleInit {
    private readonly configService;
    private readonly selversClientService;
    private readonly notificationService;
    private slideImageUrls;
    constructor(configService: ConfigService, selversClientService: SelversClientService, notificationService: NotificationService);
    onModuleInit(): Promise<void>;
    private setSlideImageUrls;
    getAllSlideImages(): Promise<GetAllSlideImagesResponse>;
}
