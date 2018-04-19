import { error } from 'util';
import * as jwt from 'jsonwebtoken';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
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
      const err = 'ALREADY REGISTER';
      return { err };
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
    try {
      const allusers = await this.usersService.findAllUsers();
      return allusers;
    } catch (err) {
      console.log(err);
    }
  }

  @Delete('/delete/:id')
  async deleteuser( @Param() param) {
    try {
      const allusers = await this.usersService.deleteUser(param.id);
      return { status: 'ok' };
    } catch (err) {
      console.log(err);
    }
  }

  @Put('/edit/:id')
  async editUser( @Req() request, @Param() param) {
    try {
      const allusers = await this.usersService.updateUser(param.id,
        { username: request.body.username, password: request.body.password });
      return { status: 'ok' };
    } catch (err) {
      console.log(err);
    }
  }


}

