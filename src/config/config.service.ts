import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Configuration } from './configuration';

@Injectable()
export class ConfigService extends NestConfigService<Configuration> {}