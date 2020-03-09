import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomSchema } from './schemas/room.schema';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as socketioJwt from 'socketio-jwt';

const ObjectId = mongoose.Types.ObjectId;

@WebSocketGateway()
export class EventsGateway implements OnModuleInit {
  constructor(@InjectModel('Room') private roomModel) {
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
    console.log('hello test')
    client.join(data.room, () => {
      const rooms = Object.keys(client.rooms);
    });
    const event = 'rooms';
    return { event, data: '123' };
  }

  @SubscribeMessage('message')
  async message(client, data) {
    const updatedRoom = await this.roomModel.findOneAndUpdate({ _id: new ObjectId(data.room) },
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
    let newRoom = await this.roomModel.findOne({ title: room });
    if (newRoom) {
      client.emit('rooms', 'hello its voice from room');
    } else {
      newRoom = await this.roomModel.create({ title: room });
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
    const room = await this.roomModel.findOne({ _id: data });
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
      userNames.push(this.server.sockets.connected[ client ].client.request.decoded_token.username);
    });
    return { event: 'usersRoom', data: userNames };
  }

}
