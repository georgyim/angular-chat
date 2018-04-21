import { EventsGateway } from './events.gateway';
import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { AuthModule } from './auth/auth.module';


const getMongoUrl = () => {
  if (process.env.MONGOUSER && process.env.MONGOPASSWORD) {
    return `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@ds249839.mlab.com:49839/angular-nest-chat-app`;
  } else {
    return 'mongodb://localhost:27017/nest';
  }
};

@Module({
  imports: [MongooseModule.forRoot(getMongoUrl()),
    UsersModule,
    RoomsModule,
    AuthModule
  ],
  components: []
})
export class ApplicationModule {
  // configure(consumer: MiddlewaresConsumer): void {
  //   consumer.apply(CorsMiddleware).forRoutes('*');
  // }
}
