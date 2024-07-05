import { ConfigService as NestConfigService } from '@nestjs/config';
import { Environment } from './types/environment.type';
export declare class ConfigService extends NestConfigService<Environment> {
}
