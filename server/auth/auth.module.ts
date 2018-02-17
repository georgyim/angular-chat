import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { RoomsModule } from './../rooms/rooms.module';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [RoomsModule, 
    forwardRef(() => UsersModule) 
  ],
  components: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/users/*', method: RequestMethod.ALL });
  }
}
