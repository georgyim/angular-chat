import { HttpClient } from '@angular/common/http';
import { ChatService } from './services/chat-sockets/socket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule } from 'ng-socket-io';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { AuthenticationService } from './services/auth/authentication.service';
import { LocalStorageService } from './services/auth/local-storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { RoomService } from './services/rooms/rooms.service';
import { SocketOne } from './services/chat-sockets/socket-one.service';

import { NgSemanticModule } from 'ng-semantic';
import { AuthGuard } from './services/auth/auth-guard.service';
import { UserlistComponent } from './components/chat/userlist/userlist.component';
import { UsersControlComponent } from './components/users-control/users-control.component';
import { UsersService } from './services/users/users.service';

// App routes
const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: '', component: ChatComponent, canActivate: [AuthGuard] },
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChatComponent,
    MessageComponent,
    LoginComponent,
    UserlistComponent,
    UsersControlComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SocketIoModule,
    HttpClientModule,
    NgSemanticModule
  ],
  providers: [
    SocketOne,
    ChatService,
    AuthenticationService,
    LocalStorageService,
    RoomService,
    AuthGuard,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
