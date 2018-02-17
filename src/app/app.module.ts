import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { ChatService } from './socket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
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

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

// App routes
const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: '', component: ChatComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChatComponent,
    MessageComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [
    ChatService,
    ApiService,
    AuthenticationService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
