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
  Inject, HttpException, HttpStatus
} from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from "./users.service";
import { InjectModel } from "@nestjs/mongoose";
// import { EventsGateway } from './../events.gateway';
import { AuthService } from './../auth/auth.service';
import { JwtStrategy } from './../auth/passport/jwt.strategy';
import { CommonResult } from '../models/common-result';

@Controller("api/users")
// @UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authSesrvice: AuthService,
    @Inject(forwardRef(() => JwtStrategy))
    private readonly jwtStrategy: JwtStrategy,
  ) {
  }


  @Post('/create')
  async createUser(@Req() request) {
    try {
      const isNewUser = await this.usersService.findOneUsers(request.body.username);
      if (isNewUser) {
        return new CommonResult(false, 'User already exist');
      }
      const newUser = await this.usersService.createUser(request.body);
      return new CommonResult(true);
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error, try later'), HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/get-profile')
  async getProfile(@Req() request) {
    try {
      const token: string = request.headers.authorization.substr(7);
      const result: JwtVerifyAnswer = await jwt.verify(token, 'secret');
      return result;
    } catch (err) {
      return new CommonResult(false, 'Unexpected token');
    }
  }

  @Get('/check-token')
  async checkToken(@Req() req) {
    try {
      const token: string = req.headers.authorization.substr(7);
      const result: boolean = this.authSesrvice.checkToken(token);
      return result;
    } catch (err) {
      return new CommonResult(false, 'Unexpected token');
    }
  }


  @Get('/get-users')
  async getAllUsers(@Req() request) {
    try {
      return await this.usersService.findAllUsers();
    } catch (err) {
      return new CommonResult(false, 'Server error');
    }
  }

  @Delete('/delete/:id')
  async deleteuser(@Param() param) {
    try {
      await this.usersService.deleteUser(param.id);
      return new CommonResult(true, 'Successfully deleted');
    } catch (err) {
      return new CommonResult(true, 'Server error');
    }
  }

  @Put('/edit/:id')
  async editUser(@Req() request, @Param() param) {
    try {
      await this.usersService.updateUser(param.id,
        { username: request.body.username, password: request.body.password });
      return new CommonResult(true, 'Successfully edited');
    } catch (err) {
      return new CommonResult(true, 'Server error');
    }
  }
}

interface JwtVerifyAnswer {
  exp: number;
  iat: number;
  username: string;
}
