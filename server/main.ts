import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// tslint:disable-next-line: radix
const port = parseInt(process.env.PORT) || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(port);
}
bootstrap();

