import { error } from 'util';
import * as jwt from 'jsonwebtoken';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ReflectMetadata,
  UseInterceptors,
  Param,
  Req,
  forwardRef,
  Inject
} from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from "./users.service";
import { InjectModel } from "@nestjs/mongoose";
// import { EventsGateway } from './../events.gateway';
import { AuthService } from './../auth/auth.service';
import { JwtStrategy } from './../auth/passport/jwt.strategy';

@Controller("users")
// @UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authSesrvice: AuthService,
    @Inject(forwardRef(() => JwtStrategy))
    private readonly jwtStrategy: JwtStrategy,
  ) { }


  @Post("/create")
  async createUser( @Req() request) {
    console.log(request.body);
    const isNewUser = await this.usersService.findOneUsers(request.body.username);
    if (isNewUser) {
      return 'ALREADY REGISTER';
    }
    const newUser = await this.usersService.createUser(request.body);
    console.log('newuser', newUser);
    return newUser;

  }

  @Get('/get-profile')
  async getProfile( @Req() request) {
    let alo = request.headers.authorization;
    alo = alo.substr(7);
    try {
      return await jwt.verify(
        alo,
        'secret');
    } catch (err) {
      return 'Unexpected token';
    }
  }


}

