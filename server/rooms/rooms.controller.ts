import {
  Controller,
  Get,
  Req
} from "@nestjs/common";
import { RoomsService } from './rooms.service';
import { CommonResult } from '../models/common-result';

@Controller("api/rooms")
// @UseGuards(RolesGuard)
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
  ) {
  }

  @Get()
  async getAllRooms(@Req() request) {
    try {
      const allRooms = await this.roomsService.findAllRooms();
      return allRooms.map(elem => {
        const newElem = { ...elem };
        delete newElem.messages;
        return newElem;
      }).sort((a, b) => {
        return (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0);
      });
    } catch (err) {
      return new CommonResult(false, 'Server error');
    }
  }

  @Get('/room/:id')
  async findRoom(@Req() request) {
    try {
      const params = request.params;
      return await this.roomsService.findOneRooms(request.params.id);
    } catch (err) {
      return new CommonResult(false, 'Server error');
    }
  }
}

