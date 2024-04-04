import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;

  const document = JSON.parse(
    readFileSync(join(process.cwd(), 'dist', 'swagger.json')).toString('utf-8'),
  );
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => {
    Logger.log(`🔥Server running at port:${PORT}`, 'Bootstrap');
  });
}
bootstrap();