import { UserSchema } from './schemas/user.schema';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod  } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from '../cats/schemas/room.schema';
import { EventsGateway } from '../events.gateway';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }, { name: 'User', schema: UserSchema }])],
  controllers: [CatsController],
  components: [CatsService, EventsGateway],
})

export class CatsModule {
   configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(CorsMiddleware).forRoutes(
            { path: '*', method: RequestMethod.ALL},
        );
    }
}
