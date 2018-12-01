import { UserSchema } from '../schemas/user.schema';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CorsMiddleware } from '../middlewares/cors.middleware';
import { RoomSchema } from './../schemas/room.schema';
import { EventsGateway } from '../events.gateway';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
    controllers: [RoomsController],
    components: [RoomsService, EventsGateway],
    exports: [RoomsService]
})

export class RoomsModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CorsMiddleware).forRoutes(
            { path: '*', method: RequestMethod.ALL },
        );
    }
}
