import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) {
        
        // socket.on('connect', function() {
        //     console.log('Connected');
        //     socket.emit('events', { test: 'test' });
        // });
        // socket.on('events', function(data) {
        //     console.log('event', data);
        // });
        // socket.on('exception', function(data) {
        //     console.log('event', data);
        // });
        // socket.on('disconnect', function() {
        //     console.log('Disconnected');
        // });
     }

    init() {
        console.log('wtf');
        this.socket.emit('rooms', { room: 'hello allo' });
        // this.socket.on('connect', function() {
        //     console.log('Connected');
        //     this.socket.emit('events', { test: 'test' });
        // });
        // this.socket.on('events', function(data) {
        //     console.log('event', data);
        // });
        // this.socket.on('exception', function(data) {
        //     console.log('event', data);
        // });
        // this.socket.on('disconnect', function() {
        //     console.log('Disconnected');
        // });
    }

    sendMessage(text) {
        this.socket.emit('message', {message: text});
        
    }

    getMessage() {
        return this.socket
            .fromEvent('message')
            .map( (data: any) => data );
    }

    getRooms() {
        return this.socket
            .fromEvent('updatedRooms')
            .map( (data: any) => data );
    }

    

    joinRoom(room) {
        this.socket.emit('chatroom', room);
    }

    addRoom(room) {
        this.socket.emit('addroom', room);
    }
}

            // const socket = io('http://localhost:3000');
            // socket.on('connect', function() {
            //     console.log('Connected');
            //     socket.emit('events', { test: 'test' });
            // });
            // socket.on('events', function(data) {
            //     console.log('event', data);
            // });
            // socket.on('exception', function(data) {
            //     console.log('event', data);
            // });
            // socket.on('disconnect', function() {
            //     console.log('Disconnected');
            // });
