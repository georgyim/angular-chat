import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {

  private authorizedUser;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService, ) {
  }

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
      throw new HttpException('Username or password is wrong', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateLogin(user): Promise<boolean> {
    try {
      const existedUser = await this.usersService.findOneByUsername(user);
      if (existedUser !== null) {
        this.authorizedUser = existedUser;
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async checkToken(token): Promise<boolean>{
    try {
      const user = jwt.verify(token, 'secret');
      return await this.validateLogin(user);
    } catch (err) {
      return false;
    }
  }

  validateUser(signedUser): boolean {
    return true;
  }
}
