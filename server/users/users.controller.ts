import { Controller, Delete, forwardRef, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { CommonResult } from '../models/common-result';
// import { EventsGateway } from './../events.gateway';
import { AuthService } from './../auth/auth.service';
import { UsersService } from "./users.service";

@Controller("api/users")
// @UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authSesrvice: AuthService,
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
      if(newUser) {
        return new CommonResult(true, 'User succesfully created');
      } else {
        throw new Error();
      }
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
      throw new HttpException(new CommonResult(false, 'Unexpected token'), HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('/check-token')
  async checkToken(@Req() req) {
    try {
      const token: string = req.headers.authorization.substr(7);
      const result: boolean = await this.authSesrvice.checkToken(token);
      return result;
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Unexpected token'), HttpStatus.UNAUTHORIZED);
    }
  }


  @Get('/get-users')
  async getAllUsers(@Req() request) {
    try {
      return await this.usersService.findAllUsers();
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:id')
  async deleteuser(@Param() param) {
    try {
      await this.usersService.deleteUser(param.id);
      return new CommonResult(true, 'Successfully deleted');
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/edit/:id')
  async editUser(@Req() request, @Param() param) {
    try {
      await this.usersService.updateUser(param.id,
        { username: request.body.username, password: request.body.password });
      return new CommonResult(true, 'Successfully edited');
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }
}

interface JwtVerifyAnswer {
  exp: number;
  iat: number;
  username: string;
}
