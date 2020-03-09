import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';

const port = process.env.PORT || 3000;


// async function bootstrap() {
//   const server = express();
//   const app = await NestFactory.create(AppModule, server);

//   app.useStaticAssets(path.join(__dirname, '../../dist'));
//   app.setBaseViewsDir(path.join(__dirname, '../../dist'));
//   app.setViewEngine('html');

//   app.use(cors());
//   // app.setGlobalPrefix('api');
//   app.useGlobalPipes(new ValidationPipe());
//   app.useGlobalFilters(new NotFoundExceptionFilter());

//   await app.listen(parseInt(process.env.PORT) || 3000);

// }
// bootstrap();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // tslint:disable-next-line: radix
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
