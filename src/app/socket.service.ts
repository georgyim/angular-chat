import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) {
    }

    init() {
        this.socket.emit('rooms', { room: 'hello allo' });
    }

    sendMessage(text, name, roomId) {
        this.socket.emit('message', { message: text, username: name, room: roomId });
    }

    getMessage() {
        return this.socket
            .fromEvent('message')
            .map((data: any) => data);
    }

    getRooms() {
        return this.socket
            .fromEvent('updatedRooms')
            .map((data: any) => data);
    }

    joinRoom(room) {
        this.socket.emit('chatroom', room);
    }

    addRoom(room) {
        this.socket.emit('addroom', room);
    }
}
