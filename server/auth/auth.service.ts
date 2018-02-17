import * as jwt from 'jsonwebtoken';
import { Component, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { UsersService } from './../users/users.service';

@Component()
export class AuthService {

  private authorizedUser;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService, ) { }

  async createToken() {
    const expiresIn = '60h',
      secretOrKey = 'secret';
    const user = { username: this.authorizedUser.username };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async getAccessToken(user) {
    const validUser = await this.validateLogin(user);
    if (validUser) {
      return await this.createToken();
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateLogin(user): Promise<boolean> {
    try {
      const existedUser = await this.usersService.findOneByUsername(user.username);
      if (existedUser) {
        this.authorizedUser = existedUser;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async checkToken(token) {
    try {
      const user = jwt.verify(token, 'secret');
      return this.validateLogin(user);
    } catch (err) {
      return false;
    }
  }

  async validateUser(signedUser): Promise<boolean> {
    return true;
  }
}
