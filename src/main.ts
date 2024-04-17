import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error', 'verbose'],
  });
  const PORT = 3000;

  if(process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const swaggerPath = join(process.cwd(), 'dist', 'swagger.json');
  if(existsSync(swaggerPath)) {
    const document = JSON.parse(
      readFileSync(swaggerPath).toString('utf-8'),
    );
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(PORT, () => {
    Logger.verbose(`테이블 오더 동작 중... 포트: ${PORT}`, 'Bootstrap');
  });
}
bootstrap();