import { Controller, Delete, forwardRef, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Req, UseGuards, HttpCode } from "@nestjs/common";
import { CommonResult } from '../models/common-result';
import { User } from '../models/user';
import { AuthService } from './../auth/auth.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { UsersService } from "./users.service";
import { JwtVerifyAnswer } from "../auth/strategies/jwt.strategy";

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
  async createUser(@Req() request): Promise<CommonResult> {
    try {
      const isNewUser: User = await this.usersService.findOne(request.body.username);
      if (isNewUser) {
        throw new HttpException(new CommonResult(false, 'User already exist'), HttpStatus.BAD_REQUEST);
      }
      const newUser: User = await this.usersService.createUser(request.body);
      if (newUser) {
        return new CommonResult(true, 'User succesfully created');
      } else {
        throw new Error();
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(new CommonResult(false, 'Server error, try later'), HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/get-profile')
  async getProfile(@Req() request): Promise<JwtVerifyAnswer> {
    try {
      return {username: request.user.username};
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Unexpected token'), HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-users')
  async getAllUsers(@Req() request): Promise<User[]> {
    try {
      return await this.usersService.findAllUsers();
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteuser(@Param() param): Promise<CommonResult> {
    try {
      await this.usersService.deleteUser(param.id);
      return new CommonResult(true, 'Successfully deleted');
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/edit/:id')
  async editUser(@Req() request, @Param() param): Promise<CommonResult> {
    try {
      await this.usersService.updateUser(param.id,
        { username: request.body.username, password: request.body.password });
      return new CommonResult(true, 'Successfully edited');
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }
}
