import { UserSchema } from '../schemas/user.schema';
import { Module, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([ { name: 'User', schema: UserSchema } ])
  ],
  controllers: [ UsersController ],
  providers: [ UsersService,],
  exports: [ UsersService ]
})

export class UsersModule {
}
