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


  @Post('/create')
  async createUser( @Req() request) {
    const isNewUser = await this.usersService.findOneUsers(request.body.username);
    if (isNewUser) {
      return 'ALREADY REGISTER';
    }
    const newUser = await this.usersService.createUser(request.body);
    return newUser;

  }

  @Get('/get-profile')
  async getProfile( @Req() request) {
    let token = request.headers.authorization;
    token = token.substr(7);
    try {
      return await jwt.verify(
        token,
        'secret');
    } catch (err) {
      return 'Unexpected token';
    }
  }

  @Get('/check-token')
  async checkToken( @Req() req) {
    let token = req.headers.authorization;
    token = token.substr(7);
    try {
      return this.authSesrvice.checkToken(token);
    } catch (err) {
      return 'Unexpected token';
    }
  }


  @Get('/get-users')
  async getAllUsers( @Req() request) {
    console.log('users get users')
      try {
          const allusers = await this.usersService.findAllUsers();
          return allusers;
      } catch (err) {
          console.log(err);
      }
  }

}

