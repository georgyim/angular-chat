import { User } from './models/User';
import { Room } from './models/Room';
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
import { Socket, Server } from 'socket.io';
import { resolve } from 'dns';

const ObjectId = mongoose.Types.ObjectId;

@WebSocketGateway()
export class EventsGateway implements OnModuleInit {
  constructor(@InjectModel('Room') private roomModel) {
  }

  @WebSocketServer() server: Server;

  onModuleInit(): void {
    this.server.use(socketioJwt.authorize({
      secret: 'secret',
      handshake: true
    }));
  }

  @SubscribeMessage('message')
  async message(client: Socket, data): Promise<GatewayEventInterface<{ text: string, username: string, room: Room }>> {
    const updatedRoom: Room = await this.roomModel.findOneAndUpdate({ _id: new ObjectId(data.room) },
      { $push: { messages: { username: data.username, text: data.message } } });
    const event = 'message';
    const payload = { text: data.message, username: data.username, room: data.room };
    client.to(data.room).emit(event, payload);
    return { event, data: payload };
  }

  @SubscribeMessage('addroom')
  async addroom(client: Socket, data: string): Promise<void> {
    const room: string = data;
    let newRoom: Room = await this.roomModel.findOne({ title: room });
    if (newRoom) {
      client.emit('rooms', 'hello its voice from room');
    } else {
      newRoom = await this.roomModel.create({ title: room });
      client.emit('updatedRooms', newRoom);
    }
  }

  @SubscribeMessage('chatroom')
  async enterRoom(client: Socket, data: string): Promise<GatewayEventInterface<User[]>> {
    try {
      client.join(data);

      const clientIdList: string[] = await new Promise(resolve => {
        this.server
          .of('/')
          .in(data)
          .clients((err, clients: string[]) => resolve(clients));
      })

      const userNames: User[] = clientIdList
        .map((clientId: string) => {
          // socketio-jwt has incorrect type
          return (this.server.sockets.connected[clientId] as any).decoded_token.username;
        });

      return { event: 'usersRoom', data: userNames };
    } catch {
      return { event: 'usersRoom', data: [] };
    }
  }
}

interface GatewayEventInterface<T> {
  event: string;
  data: T;
}
