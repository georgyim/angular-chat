// Core

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';


// Modules

import { MyOwnCustomMaterialModule } from './common/ang-material.module';
import { SharedModule } from './shared/shared.module';


// Other

import { SocketIoModule } from 'ng-socket-io';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { NgSemanticModule } from 'ng-semantic';
import { AuthGuard } from './services/auth/auth-guard.service';
import { UserlistComponent } from './components/chat/userlist/userlist.component';
import { UsersControlComponent } from './components/users-control/users-control.component';

import { AddUserComponent } from './components/users-control/add-user/add-user.component';
import { SortDirective } from './directives/sort/sort.directive';



// App routes
const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: '', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'user-control', component: UsersControlComponent, canActivate: [AuthGuard] },
];


@NgModule({
  entryComponents: [
    AddUserComponent
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    ChatComponent,
    MessageComponent,
    LoginComponent,
    UserlistComponent,
    UsersControlComponent,
    SortDirective,
    AddUserComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SocketIoModule,
    HttpClientModule,
    NgSemanticModule,
    MyOwnCustomMaterialModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
