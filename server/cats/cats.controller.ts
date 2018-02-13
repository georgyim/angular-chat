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
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { InjectModel } from "@nestjs/mongoose";
// import { EventsGateway } from './../events.gateway';

@Controller("cats")
// @UseGuards(RolesGuard)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,

  ) {}


  @Post("/register")
  async createUser(@Req() request) {
    console.log(request.body);
      const isNewUser = await this.catsService.findOneUsers(request.body.username);
      if (isNewUser) {
        return 'ALREADY REGISTER';
      }
      const newUser = await this.catsService.createUser(request.body);
      console.log('newuser', newUser);
      return newUser;

  }

  @Post("/login")
  async loginUser(@Req() request) {
    console.log(request.body);
    // return 'wtf';
    try {
      const user = await this.catsService.findOneUsers(request.body.username);
      return {user: user};
    } catch (err) {
      return err;
    }
  }

  @Post("/rooms")
  async getAllRooms(@Req() request) {
    const body = request.body;
    try {
        const user = await this.catsService.findOneUsers(request.body.username);
      if (user) {
        console.log(user);
        const allRooms = await this.catsService.findAllRooms();
        return allRooms;
      }  
      return 'user not found';
    } catch (err) {
      return err;
    }
  }

  @Get('/room/:id')
  async findRoom(@Req() request) {
    const params = request.params;
    try {
        const room = this.catsService.findOneRooms(request.params.id);
    } catch (err) {
      return err;
    }
  }
  }

