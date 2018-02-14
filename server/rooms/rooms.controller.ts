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
import { InjectModel } from "@nestjs/mongoose";
import { RoomsService } from './rooms.service';

@Controller("rooms")
// @UseGuards(RolesGuard)
export class RoomsController {
    constructor(
        private readonly roomsService: RoomsService,

    ) { }


    @Get("")
    async getAllRooms( @Req() request) {
        const body = request.body;
        try{
            const allRooms = await this.roomsService.findAllRooms();
            return allRooms;
        } catch (err) {
            console.log(err);
        }
        
    }

    @Get('/room/:id')
    async findRoom( @Req() request) {
        const params = request.params;
        try {
            const room = this.roomsService.findOneRooms(request.params.id);
        } catch (err) {
            return err;
        }
    }
}

