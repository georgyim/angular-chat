import { Controller, Post, HttpStatus, HttpCode, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { CommonResult } from '../models/common-result';

@Controller('api/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async getToken( @Body(new ValidationPipe()) user) {
    try {
       return await this.authService.getAccessToken(user);
    } catch (err) {
      return new CommonResult(false, 'Server error');
    }
  }

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }
}
