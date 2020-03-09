import { Controller, Get, Req, HttpException, HttpStatus } from "@nestjs/common";
import { CommonResult } from '../models/common-result';
import { RoomsService } from './rooms.service';

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
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/room/:id')
  async findRoom(@Req() request) {
    try {
      return await this.roomsService.findOneRooms(request.params.id);
    } catch (err) {
      throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
    }
  }
}

