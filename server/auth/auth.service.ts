import { jwtConstants } from './constants';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private jwtService: JwtService) {
  }

  public async validateUser(user: User): Promise<User> {
    try {
      const existedUser: User = await this.usersService.findOneByUsernameAndPassword(user);
      return existedUser || null;
    } catch (err) {
      return null;
    }
  }

  public async login(user: User): Promise<AcessToken> {
    const payload = { username: user.username, sub: user._id };
    return {
      expireTime: jwtConstants.expireTokenTime,
      value: this.jwtService.sign(payload),
    };
  }



}

export interface AcessToken {
  expireTime: string;
  value: string;
}
