import { Observable } from 'rxjs';


import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketOne } from './socket-one.service';
@Injectable()
export class ChatService {

    constructor(private socket: SocketOne) {
    }

    init() {
        console.log('init socket');
        this.socket.emit('rooms', { room: 'hello allo' });
    }

    sendMessage(text, name, roomId) {
        this.socket.emit('message', { message: text, username: name, room: roomId });
    }

    getMessage() {
        return this.socket
            .fromEvent('message')
    }

    getRooms() {
        return this.socket
            .fromEvent('updatedRooms')
    }

    joinRoom(room) {
        this.socket.emit('chatroom', room);
    }

    addRoom(room) {
        this.socket.emit('addroom', room);
    }

    getUsers() {
        return this.socket
            .fromEvent('usersRoom')
    }
}
