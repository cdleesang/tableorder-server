import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService<{
  STORE_ID: string,
  ACCESS_TOKEN: string,
  STORE_MEMBER_ID: string,
}> {}