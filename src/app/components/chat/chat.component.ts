import { ApiService } from '../../api.service';
import { ChatService } from '../../socket.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';

interface IMessage {
  username: String;
  text: String;
}

interface IUser {
  name: String;
  password: String;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public text: String;
  public name: String;
  password: String;
  addroom: String;
  public message: IMessage;
  public messages: IMessage[];
  rooms;
  curRoom;
  title;
  public currentRoomId: String;

  constructor(
    private chatService: ChatService,
    private apiservice: ApiService,
    private authService: AuthenticationService,
  ) {
    this.messages = [{ username: 'Bugz Bunny', text: 'Choose the room =)' }];
  }

  ngOnInit() {
    this.getProfile();
    this.chatService.getMessage().subscribe(data => {
      this.messages.push(data);
    });
    this.getRooms();
    this.chatService.init();
    this.getRoomsFromSocket();
  }

  send() {
    if (this.text.trim() !== '') {
      this.chatService.sendMessage(this.text, this.name, this.currentRoomId);
      this.text = '';
    }
  }

  addnewroom() {
    if (this.addroom.trim() !== '') {
      this.chatService.addRoom(this.addroom);
    }
  }

  getRoomsFromSocket() {
    this.chatService.getRooms()
      .subscribe(res => {
        const updatedRooms = [...this.rooms, res];
        this.rooms = updatedRooms;
      });
  }

  register() {
    const { name, password } = this;
    this.apiservice.register(name, password).subscribe(res => {
      console.log(res);
    });
  }

  login() {
    const { name, password } = this;
    this.apiservice.login(name, password).subscribe(res => {
      localStorage.setItem('mytoken', 'Bearer ' + res['access_token']);
      console.log(res);
    });
  }

  getRooms() {
    this.apiservice.getRooms().subscribe(res => {
      this.rooms = res;
    });
  }

  joinRoom(room) {
    this.chatService.joinRoom(room);
    this.currentRoomId = room;
  }

  getRoom(id) {
    this.apiservice.getRoom(id)
      .subscribe(res => {
        this.messages = res['messages'];
        this.title = res['title'];
      });
  }

  getProfile() {
    this.authService.getProfile()
      .subscribe(res => {
        this.name = res['username'];
        console.log(this.name);
      });
  }


}
