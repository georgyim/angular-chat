import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomSchema } from './schemas/room.schema';
import { Document } from 'mongoose';

export interface Room extends Document {
  // title: { type: String, required: true };
  // connections: { type: [{ userId: String, socketId: String }]};
  title: String;
  connections: String;
}


@WebSocketGateway()
export class EventsGateway {
  public wtf;
  constructor(@InjectModel(RoomSchema) private  RoomModel) { 
    this.wtf = RoomModel;
  }




  @WebSocketServer() server;

  @SubscribeMessage('rooms')
  onEvent(client, data): any {
    client.join(data.room, () => {
        const rooms = Object.keys(client.rooms);
        // console.log(rooms);
    });
    const event = 'rooms';
    const response = [1, 2, 3, 4 , 5];
    return { event, data: '123' };
  }

  @SubscribeMessage('message')
  message(client, data): any {
    // console.log(data);
    const event = 'message';
    const response = [1, 2, 3, 4 , 5];
    const payload = {text: data.message, name: 'myself'};
    console.log('payload', payload);
    return { event, data: payload };
  }

  @SubscribeMessage('addroom')
  async addroom(client, data) {
    console.log(data);
    const event = 'rooms';
    const room = data;
    let newRoom = await this.RoomModel.findOne({title: room});
    if (newRoom) {
      client.emit('rooms', 'hello its voice from room')
    } else {
     newRoom = await this.RoomModel.create({title: room});
     client.emit('updatedRooms', newRoom);
    }
  }

  @SubscribeMessage('chatroom')
  async enterRoom(client, data) {
    const event = 'joinroom';
    // const room = data;
    console.log('client', data);
    const room = await this.RoomModel.findOne({_id: data});
    
  }

}
