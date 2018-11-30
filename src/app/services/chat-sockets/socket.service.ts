import { Injectable } from '@angular/core';
import { SocketOne } from './socket-one.service';

@Injectable()
export class ChatService {

  public constructor(private socket: SocketOne) {
  }

  public init() {
    console.log('init socket');
    this.socket.emit('rooms', {room: 'hello allo'});
  }

  public sendMessage(text, name, roomId) {
    this.socket.emit('message', {message: text, username: name, room: roomId});
  }

  public getMessage() {
    return this.socket.fromEvent('message');
  }

  public getRooms() {
    return this.socket.fromEvent('updatedRooms');
  }

  public joinRoom(room) {
    this.socket.emit('chatroom', room);
  }

  public addRoom(room) {
    this.socket.emit('addroom', room);
  }

  public getUsers() {
    return this.socket.fromEvent('usersRoom');
  }
}
