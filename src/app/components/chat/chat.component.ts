import { ChatService } from '../../services/chat-sockets/socket.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, JwtVerifyAnswer } from '../../services/auth/authentication.service';
import { RoomService } from './../../services/rooms/rooms.service';
import { User } from '../../entities/user';
import { Room } from '../..//entities/room';
import { Message } from '../..//entities/message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.css' ]
})
export class ChatComponent implements OnInit {
  public text: string;
  public name: string;
  public newRoom: string;
  public messages: Message[] = [];
  public rooms: Room[];
  public title: string;
  public currentRoomId: string;
  public users: User[];

  public constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private roomService: RoomService,
  ) {
    this.title = 'Eat a carrot )';
    this.messages.push(new Message('Bugz Bunny', 'Choose the room =)'));
  }

  public ngOnInit() {
    this.getProfile();
    this.chatService.getMessage().subscribe((data: Message) => {
      this.messages.push(data);
    });
    this.getRooms();
    this.chatService.init();
    this.getRoomsFromSocket();
    this.getUsersList();
  }

  public send(): void {
    if (this.text.trim() !== '') {
      this.chatService.sendMessage(this.text, this.name, this.currentRoomId);
      this.text = '';
    }
  }

  public addnewroom(): void {
    if (this.newRoom.trim() !== '') {
      this.chatService.addRoom(this.newRoom);
    }
  }

  public getRoomsFromSocket(): void {
    this.chatService.getRooms()
      .subscribe((res: Room) => {
        const updatedRooms = [ res, ...this.rooms ];
        this.rooms = updatedRooms;
      });
  }


  public getRooms(): void {
    this.roomService.getRooms()
      .subscribe((res: Room[]) => {
        this.rooms = res;
      });
  }

  public joinRoom(room): void {
    this.chatService.joinRoom(room);
    this.currentRoomId = room;
  }

  public getRoom(id): void {
    this.roomService.getRoom(id)
      .subscribe((res: Room) => {
        this.messages = res.messages;
        this.title = res.title;
      });
  }

  public getProfile(): void {
    this.authService.getProfile()
      .subscribe((res: JwtVerifyAnswer) => {
        this.name = res.username;
      });
  }

  public getUsersList(): void {
    this.chatService.getUsers()
      .subscribe((res: User[]) => {
        this.users = res;
      });
  }

}
