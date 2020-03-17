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

  public sendMessage(text: string, name: string, roomId: string): void {
    this.socket.emit('message', {message: text, username: name, room: roomId});
  }

  public getMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('send<M>essage');
  }

  public joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }

  public getRooms(): Observable<Room> {
    return this.socket.fromEvent<Room>('updatedRooms');
  }

  public addRoom(roomName: string): void {
    this.socket.emit('addroom', roomName);
  }

  public getUsers(): Observable<User[]> {
    return this.socket.fromEvent<User[]>('usersRoom');
  }
}
