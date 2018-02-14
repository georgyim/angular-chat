import { UserSchema } from '../schemas/user.schema';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CorsMiddleware } from '../middlewares/cors.middleware';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UsersController],
    components: [UsersService,
        // EventsGateway
    ],
    exports: [UsersService]
})

export class UsersModule {
    configure(consumer: MiddlewaresConsumer): void {
         consumer.apply(CorsMiddleware).forRoutes(
             { path: '*', method: RequestMethod.ALL},
         );
     }
}