import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { TskvLogger } from './logger/tskv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api/afisha');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.useLogger(new TskvLogger());
  await app.listen(3000);
}
bootstrap();
