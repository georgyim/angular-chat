import { error } from 'util';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ReflectMetadata,
  UseInterceptors,
  Param,
  Req
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { InjectModel } from "@nestjs/mongoose";
// import { EventsGateway } from './../events.gateway';

@Controller("users")
// @UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }


  @Post("/create")
  async createUser( @Req() request) {
    console.log(request.body);
    const isNewUser = await this.usersService.findOneUsers(request.body.username);
    if (isNewUser) {
      return 'ALREADY REGISTER';
    }
    const newUser = await this.usersService.createUser(request.body);
    console.log('newuser', newUser);
    return newUser;

  }

}

