import { Room } from '../models/room';
import { Controller, Get, Req, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { CommonResult } from '../models/common-result';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExtractJwt } from 'passport-jwt';

@Controller("api/rooms")
// @UseGuards(RolesGuard)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRooms(@Req() request): Promise<Room[]> {
    try {
      const allRooms: Room[] = await this.roomsService.findAllRooms();
      return allRooms.map(elem => {
        const newElem = { ...elem };
        delete newElem.messages;
        return newElem;
      }).sort((a, b) => {
        return (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0);
      });
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/room/:id')
  async findRoom(@Req() request): Promise<Room> {
    try {
      return await this.roomsService.findOneRooms(request.params.id);
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }
}

