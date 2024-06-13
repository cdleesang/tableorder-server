import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Environment } from './types/environment.type';

@Injectable()
export class ConfigService extends NestConfigService<Environment> {}