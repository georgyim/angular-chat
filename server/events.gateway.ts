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
import { RoomSchema } from './cats/schemas/room.schema';
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
    console.log(this.RoomModel);
    console.log(data);
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
    console.log(data);
    const event = 'message';
    const response = [1, 2, 3, 4 , 5];
    const payload = {text: data.message, name: 'myself'};
    console.log('payload', payload);
    return { event, data: payload };
  }

  @SubscribeMessage('addroom')
  addroom(client, data): any {
    console.log(data);
    // const event = 'message';
    // const response = [1, 2, 3, 4 , 5];
    // const payload = {text: data.message, name: 'myself'};
    // console.log('payload', payload);
    // return { event, data: payload };
  }


}
