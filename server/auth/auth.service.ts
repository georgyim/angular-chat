import * as jwt from 'jsonwebtoken';
import { Component, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CatsService } from './../cats/cats.service';

@Component()
export class AuthService {

  private authorizedUser;

  constructor(public catService: CatsService) {}

  async createToken() {
    const expiresIn = 60 * 60,
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
    console.log('validUser', validUser);
    if (validUser) {
      return await this.createToken();
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
  async validateLogin(user): Promise<boolean> {
    const existedUser = await this.catService.findOneByUsername(user.username);
    this.authorizedUser = existedUser;
    return true;

    // if (existedUser) {
    //   const passwordIsMatch = await bcrypt.compareSync(userDto.password, existedUser.password);

    //   if (passwordIsMatch) {
    //     this.authorizedUser = existedUser;
    //     return true;
    //   } else {
    //     // TODO log('user password not match');
    //     // TODO invalid login attempts counter++
    //     return false;
    //   }
    // } else {
    //   // TODO log('user not exist');
    //   // TODO invalid login attempts counter++
    //   return false;
    // }
  }

  async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}
