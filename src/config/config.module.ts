import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigService } from './config.service';
import { Environment } from './types';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object<Environment>({
        STORE_ID: Joi.string().required(),
        STORE_MEMBER_ID: Joi.string().required(),
        ACCESS_TOKEN: Joi.string().required(),
        POS_DATABASE_HOST: Joi.string().required(),
        POS_DATABASE_PORT: Joi.number().default(3050),
        POS_DATABASE_FILE_PATH: Joi.string().required(),
        POS_DATABASE_USER: Joi.string().required(),
        POS_DATABASE_PASSWORD: Joi.string().required(),
        ADMIN_JWT_SECRET: Joi.string().required(),
        ADMIN_REFRESH_JWT_SECRET: Joi.string().required(),
        TABLE_JWT_SECRET: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
  // exports: [NestConfigModule],
})
export class ConfigModule {}