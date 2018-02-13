import { ApiService } from "./../api.service";
import { ChatService } from "./../socket.service";
import { Component, OnInit } from "@angular/core";

interface IMessage {
  name: String;
  text: String;
}

interface IUser {
  name: String;
  password: String;
}

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  public text: String;
  public name: String;
  password: String;
  addroom: String;
  public message: IMessage;
  public messages: IMessage[];

  constructor(
    private chatService: ChatService,
    private apiservice: ApiService
  ) {
    this.messages = [{ name: "123", text: "555" }];
  }

  ngOnInit() {
    this.chatService.getMessage().subscribe(data => {
      this.messages.push(data);
    });
    this.chatService.init();
    this.getRooms();
  }

  send() {
    this.chatService.sendMessage(this.text);
    this.text = "";
  }

  addnewroom() {
    this.chatService.addRoom(this.addroom);
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
      console.log(res);
    });
  }

  getRooms() {
    let { name, password } = this;
    /@params temp/
    name = "123"; 
    password = "123";

    this.apiservice.getRooms(name, password).subscribe(res => {
      console.log(res);
    });
  }

  

}
