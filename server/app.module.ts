import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

const getMongoUrl = () => {
  if (process.env.MONGOUSER && process.env.MONGOPASSWORD) {
    return `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@ds249839.mlab.com:49839/angular-nest-chat-app`;
  } else {
    return 'mongodb://localhost:27017/nest';
  }
};

@Module({
  imports: [
    MongooseModule.forRoot(getMongoUrl()),
    UsersModule,
    RoomsModule,
    AuthModule
  ],
})
export class AppModule {}
