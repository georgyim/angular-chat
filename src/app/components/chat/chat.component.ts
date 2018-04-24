import { ChatService } from '../../services/chat-sockets/socket.service';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { RoomService } from './../../services/rooms/rooms.service';

interface IMessage {
  username: String;
  text: String;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;



  public text: String;
  public name: String;
  public newRoom: String;
  public messages: IMessage[];
  public rooms: any;
  public curRoom: any;
  public title: String;
  public currentRoomId: String;
  public users: any[];

  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private roomService: RoomService,
  ) {
    this.title = 'Eat a carrot )';
    this.messages = [{ username: 'Bugz Bunny', text: 'Choose the room =)' }];
  }

  ngOnInit() {
    this.getProfile();
    this.chatService.getMessage().subscribe(data => {
      this.messages.push(data);
      setTimeout(() => this.scrollToBottom(), 0);
    });
    this.getRooms();
    this.chatService.init();
    this.getRoomsFromSocket();
    this.getUsersList();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
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
      .subscribe(res => {
        const updatedRooms = [...this.rooms, res];
        this.rooms = updatedRooms;
      });
  }


  getRooms() {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res;
    });
  }

  joinRoom(room) {
    this.chatService.joinRoom(room);
    this.currentRoomId = room;
  }

  getRoom(id) {
    this.roomService.getRoom(id)
      .subscribe(res => {
        this.messages = res['messages'];
        this.title = res['title'];
        setTimeout(() => this.scrollToBottom(), 0);
      });
  }

  getProfile() {
    this.authService.getProfile()
      .subscribe(res => {
        this.name = res['username'];
      });
  }

  getUsersList() {
    this.chatService.getUsers()
      .subscribe(res => {
        this.users = res;
        console.log(this.users);
      });
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

}
