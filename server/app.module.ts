import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';


const getMongoUrl = () => {
  if (process.env.MONGOUSER && process.env.MONGOPASSWORD) {
    return `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@ds249839.mlab.com:49839/angular-nest-chat-app`;
  } else {
    return 'mongodb://localhost:27017/nest';
  }
};
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../dist'),
    }),
    MongooseModule.forRoot(getMongoUrl()),
    UsersModule,
    RoomsModule,
    AuthModule
  ],
})
export class AppModule {}
