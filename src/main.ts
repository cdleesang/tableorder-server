import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'verbose'],
  });
  const PORT = 3000;

  if(process.env.NODE_ENV === 'development') {
    app.enableCors();
    
    const swaggerPath = join(process.cwd(), 'dist', 'swagger.json');
    if(existsSync(swaggerPath)) {
      const document = JSON.parse(
        readFileSync(swaggerPath).toString('utf-8'),
      );
      SwaggerModule.setup('api/docs', app, document);
    }
  }
  
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: false,
  });

  // TODO: 프론트엔드 구현 후 버저닝 끄고 주석 해제
  // app.setGlobalPrefix('api');

  await app.listen(PORT, () => {
    process.send?.('ready');
    Logger.verbose(`테이블 오더 동작 중... 포트: ${PORT}`, 'Bootstrap');
  });
}
bootstrap();