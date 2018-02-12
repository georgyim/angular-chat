import { ChatService } from './../socket.service';
import { Component, OnInit } from '@angular/core';

interface IMessage {
  name: String;
  text: String;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public text: String;
  public name: String;
  addroom: String;
  public message: IMessage;
  public messages: IMessage[];

  constructor(private chatService: ChatService) {
    this.messages = [
      {name: '123', text: '555'},
    ];
   }

  ngOnInit() {
    this.chatService.getMessage()
      .subscribe(data => {
        this.messages.push(data);
      });
      this.chatService.init();
  }

  send() {
    this.chatService.sendMessage(this.text);
    this.text = '';
  }

  addnewroom() {
    this.chatService.addRoom(this.addroom);
  }
}
