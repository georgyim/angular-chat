import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

import { ApplicationModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(cors());
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.use(express.static(path.join(__dirname, '../../dist')));
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
