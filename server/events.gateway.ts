import { OnModuleInit } from '@nestjs/common';
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
import { Room } from './events.gateway';
import * as mongoose from 'mongoose';
import * as socketioJwt from 'socketio-jwt';
// var socketioJwt   = require("socketio-jwt");
const ObjectId = mongoose.Types.ObjectId;

export interface Room extends Document {
  // title: { type: String, required: true };
  // connections: { type: [{ userId: String, socketId: String }]};
  title: String;
  connections: String;
}


@WebSocketGateway()
export class EventsGateway implements OnModuleInit {

  constructor( @InjectModel(RoomSchema) private RoomModel) {

  }

  @WebSocketServer() server;

  onModuleInit() {
    this.server.set('authorization', socketioJwt.authorize({
      secret: 'secret',
      handshake: true
    }));
  }


  @SubscribeMessage('rooms')
  onEvent(client, data): any {
    client.join(data.room, () => {
      const rooms = Object.keys(client.rooms);
      // console.log(rooms);
    });
    const event = 'rooms';
    const response = [1, 2, 3, 4, 5];
    return { event, data: '123' };
  }

  @SubscribeMessage('message')
  async message(client, data) {
    const updatedRoom = await this.RoomModel.findOneAndUpdate({ _id: new ObjectId(data.room) },
      { $push: { messages: { username: data.username, text: data.message } } });
    const event = 'message';
    const payload = { text: data.message, username: data.username, room: data.room };
    client.to(data.room).emit(event, payload);
    return { event, data: payload };
  }

  @SubscribeMessage('addroom')
  async addroom(client, data) {
    const event = 'rooms';
    const room = data;
    let newRoom = await this.RoomModel.findOne({ title: room });
    if (newRoom) {
      client.emit('rooms', 'hello its voice from room');
    } else {
      newRoom = await this.RoomModel.create({ title: room });
      newRoom = {
        _id: newRoom._id,
        title: newRoom.title
      };
      client.emit('updatedRooms', newRoom);
    }
  }

  @SubscribeMessage('chatroom')
  async enterRoom(client, data) {
    const event = 'joinroom';
    const room = await this.RoomModel.findOne({ _id: data });
    client.join(data);
    const idx = client.id;

    let clientList;
    const userNames = [];
    const p = new Promise(resolve => {
      this.server.of('/').in(data).clients((err, clients) => {
        resolve(clients);
      });
    });
    clientList = await p;
    clientList.forEach(client => {
      userNames.push(this.server.sockets.connected[client].client.request.decoded_token.username);
    });
    return { event: 'usersRoom', data: userNames };
  }

}
