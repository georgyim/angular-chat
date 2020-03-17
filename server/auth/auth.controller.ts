import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Controller, Post, HttpStatus, HttpCode, Get, Body, HttpException, UseGuards } from '@nestjs/common';
import { AuthService, AcessToken } from './auth.service';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { CommonResult } from '../models/common-result';
import { User } from '../models/user';

@Controller('api/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Body(new ValidationPipe()) user: User): Promise<AcessToken> {
    try {
      return await this.authService.login(user);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.FORBIDDEN);
      }
    }
  }

}
