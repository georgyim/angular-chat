import { Component } from '@nestjs/common';
import { UsersModule } from './users.module';
import { UserSchema } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";

@Component()
export class UsersService {
  private readonly users = [];

  constructor(@InjectModel(UserSchema) private readonly userModel) {}

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

}
