import { Component } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsModule } from './cats.module';
import { UserSchema } from "./schemas/user.schema";
import { RoomSchema } from "./schemas/room.schema";
import { InjectModel } from "@nestjs/mongoose";

@Component()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(@InjectModel(UserSchema) private readonly userModel,
  @InjectModel(RoomSchema) private readonly roomModel) {}

  async createUser(user: any): Promise<any> {
    console.log('1', user);
    const createdUser = new this.userModel(user);
    console.log('2', createdUser);
    const takeUser = await createdUser.save();
    console.log('3', takeUser);
    return takeUser;
    // return await createdUser.save((err, user) => {
    //   return user;
    // });
  }

  async findAllUsers(): Promise<any[]> {
    return await this.userModel.find().exec();
  }

  async findOneUsers(username: string): Promise<any> {
    return await this.userModel.findOne({ 'username': username }).exec();
  }

  async findOneByUsername(username: string): Promise<any> {
    return await this.userModel.findOne({ 'username': username }).exec();
  }

  async updateUser(id: string, user: any): Promise<any> {
    return await this.userModel.findOneAndUpdate({ '_id': id }, user).exec();
  }

  async deleteUser(id: string): Promise<void> {
    return await this.userModel.findOneAndDelete({ '_id': id }).exec();
  }

  async createRoom(room: any): Promise<any> {
    const createdRoom = new this.roomModel(room);
    return await createdRoom.save((err, room) => {
      return room;
    });
  }

  async findAllRooms(): Promise<any[]> {
    return await this.roomModel.find().exec();
  }

  async findOneRooms(id: string): Promise<any> {
    return await this.roomModel.findOne({ '_id': id }).exec();
  }

  async findOneByRoomname(username: string): Promise<any> {
    return await this.roomModel.findOne({ 'email': username }).exec();
  }

  async updateRoom(id: string, user: any): Promise<any> {
    return await this.roomModel.findOneAndUpdate({ '_id': id }, user).exec();
  }

  async deleteRoom(id: string) {
    return await this.roomModel.findOneAndDelete({ '_id': id }).exec();
  }

}
