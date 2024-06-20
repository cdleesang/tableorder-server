import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class ConfigService extends NestConfigService<{
    STORE_ID: string;
    ACCESS_TOKEN: string;
    STORE_MEMBER_ID: string;
    POS_DATABASE_HOST: string;
    POS_DATABASE_PORT?: number;
    POS_DATABASE_FILE_PATH: string;
    POS_DATABASE_USER: string;
    POS_DATABASE_PASSWORD: string;
}> {
}
