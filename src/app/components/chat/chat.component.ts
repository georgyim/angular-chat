import { ChatService } from '../../services/chat-sockets/socket.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { RoomService } from './../../services/rooms/rooms.service';
import { User } from '../../entities/user';
import { Room } from '../..//entities/room';
import { Message } from '../..//entities/message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public text: string;
  public name: string;
  public newRoom: string;
  public messages: Message[];
  public rooms: Room[];
  public curRoom: Room;
  public title: string;
  public currentRoomId: string;
  public users: User[];

  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private roomService: RoomService,
  ) {
    this.title = 'Eat a carrot )';
    this.messages.push(new Message('Bugz Bunny', 'Choose the room =)'));
  }

  ngOnInit() {
    this.getProfile();
    this.chatService.getMessage().subscribe((data: Message) => {
      this.messages.push(data);
    });
    this.getRooms();
    this.chatService.init();
    this.getRoomsFromSocket();
    this.getUsersList();
  }

  send() {
    if (this.text.trim() !== '') {
      this.chatService.sendMessage(this.text, this.name, this.currentRoomId);
      this.text = '';
    }
  }

  addnewroom() {
    if (this.newRoom.trim() !== '') {
      this.chatService.addRoom(this.newRoom);
    }
  }

  getRoomsFromSocket() {
    this.chatService.getRooms()
      .subscribe((res: Room) => {
        const updatedRooms = [...this.rooms, res];
        this.rooms = updatedRooms;
      });
  }


  getRooms() {
    this.roomService.getRooms().subscribe((res: Room[]) => {
      this.rooms = res;
    });
  }

  joinRoom(room) {
    this.chatService.joinRoom(room);
    this.currentRoomId = room;
  }

  getRoom(id) {
    this.roomService.getRoom(id)
      .subscribe((res: Room) => {
        this.messages = res.messages;
        this.title = res.title;
      });
  }

  getProfile() {
    this.authService.getProfile()
      .subscribe((res: User) => {
        this.name = res.username;
      });
  }

  getUsersList() {
    this.chatService.getUsers()
      .subscribe((res: User[]) => {
        this.users = res;
      });
  }

}
