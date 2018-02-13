import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { ChatService } from './socket.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, SocketIoModule.forRoot(config), HttpClientModule
  ],
  providers: [ChatService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
