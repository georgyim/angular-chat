import { CatsController } from './cats/cats.controller';
import { EventsGateway } from './events.gateway';
import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './cats/schemas/room.schema';
import { CorsMiddleware } from './cats/cors.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [  MongooseModule.forRoot('mongodb://localhost:27017/nest'), CatsModule , AuthModule],
  
components: []
})
export class ApplicationModule {
  configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(CorsMiddleware).forRoutes(CatsController);
    }
}
