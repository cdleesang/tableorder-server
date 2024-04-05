import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        STORE_ID: Joi.string().required(),
        STORE_MEMBER_ID: Joi.string().required(),
        ACCESS_TOKEN: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
  // exports: [NestConfigModule],
})
export class ConfigModule {}