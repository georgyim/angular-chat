import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';

import { ApplicationModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new NotFoundExceptionFilter());

    // Point static path to dist
  app.use(express.static(path.join(__dirname, '../../dist')));
    await app.listen(3000);
}
bootstrap();
