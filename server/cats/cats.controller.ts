import { error } from 'util';
import { UserSchema } from "./schemas/user.schema";
import { RoomSchema } from "./schemas/room.schema";
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
    @InjectModel(UserSchema) private readonly UserModel,
    @InjectModel(RoomSchema) private readonly RoomModel
  ) {}

  @Post()
  @Roles("admin")
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    console.log("wtf");
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe())
    id
  ) {
    // logic
  }

  @Post("/register")
  async createUser(@Req() request) {
    console.log(request.body);
    try {
      const newUser = await this.UserModel.create(request.body);
      return newUser;
    } catch (err) {
      return err;
    }
  }

  @Post("/login")
  async loginUser(@Req() request) {
    console.log(request.body);
    try {
      const user = await this.UserModel.findOne({
        username: request.body.username
      });
      return user;
    } catch (err) {
      return err;
    }
  }

  @Post("/rooms")
  async getAllRooms(@Req() request) {
    const body = request.body;
    try {
        const user = await this.UserModel.findOne({
        username: request.body.username
      });
      if (user) {
        console.log(user);
        const allRooms = await this.RoomModel.find({});
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
        const room = this.RoomModel.findOne({})
    } catch (err) {
      return err;
    }
  }
  }

