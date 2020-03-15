import { Room } from '../models/room';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class RoomsService {
  private readonly rooms = [];

  constructor( @InjectModel('Room') private readonly roomModel) {}

  async createRoom(room: any): Promise<any> {
    const createdRoom = new this.roomModel(room);
    const newRoom =  await createdRoom.save();
    return newRoom;
  }

  async findAllRooms(): Promise<Room[]> {
    return await this.roomModel.find().lean().exec();
  }

  async findOneRooms(id: string): Promise<Room> {
    return await this.roomModel.findOne({ '_id': id }).lean().exec();
  }

  async findOneByRoomname(username: string): Promise<Room> {
    return await this.roomModel.findOne({ 'email': username }).exec();
  }

  async updateRoom(id: string, user: any): Promise<Room> {
    return await this.roomModel.findOneAndUpdate({ '_id': id }, user).exec();
  }

  async deleteRoom(id: string) {
    return await this.roomModel.findOneAndDelete({ '_id': id }).exec();
  }

}
