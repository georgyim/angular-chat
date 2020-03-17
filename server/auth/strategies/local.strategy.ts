import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';
import { ModuleRef, ContextIdFactory } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  public async validate(request: Request, username: string, password: string ): Promise<User> {
    const contextId = ContextIdFactory.getByRequest(request);

    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const validateUser = await authService.validateUser(new User(username, password));
    if (!validateUser) {
      throw new UnauthorizedException();
    }
    return validateUser;
  }

}
