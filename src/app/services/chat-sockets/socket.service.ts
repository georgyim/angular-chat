import { Injectable } from '@angular/core';
import { SocketOne } from './socket-one.service';
import { Message } from '../../entities/message';
import { Observable } from 'rxjs';
import { Room } from '../../entities/room';
import { User } from '../../entities/user';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public constructor(private socket: SocketOne) {
  }

  public sendMessage(text, name, roomId): void {
    this.socket.emit('message', {message: text, username: name, room: roomId});
  }

  public getMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('message');
  }

  public getRooms(): Observable<Room> {
    return this.socket.fromEvent<Room>('updatedRooms');
  }

  public joinRoom(room): void {
    this.socket.emit('chatroom', room);
  }

  public addRoom(room): void {
    this.socket.emit('addroom', room);
  }

  public getUsers(): Observable<User[]> {
    return this.socket.fromEvent<User[]>('usersRoom');
  }
}
