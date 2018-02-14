import * as jwt from 'jsonwebtoken';
import { Component, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './../users/users.service';

@Component()
export class AuthService {

  private authorizedUser;

  constructor(public usersService: UsersService) {}

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
    console.log('here?')
    try {
      const existedUser = await this.usersService.findOneByUsername(user.username);
      if (existedUser) {
        this.authorizedUser = existedUser;
      }
      return true;
    }  catch (err) {
      console.log(err);
      return false;
    }


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
