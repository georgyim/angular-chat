import { Controller, Post, HttpStatus, HttpCode, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async getToken( @Body(new ValidationPipe()) user) {
    return await this.authService.getAccessToken(user);
  }

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }
}