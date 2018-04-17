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
import { LoginModule } from './components/login/login.module';
import { UserControlModule } from './components/users-control/user-control.module';


// Other

import { SocketIoModule } from 'ng-socket-io';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';



import { AuthInterceptor } from './services/auth/auth.interceptor';
import { NgSemanticModule } from 'ng-semantic';
import { AuthGuard } from './services/auth/auth-guard.service';
import { UserlistComponent } from './components/chat/userlist/userlist.component';

import { SortDirective } from './directives/sort/sort.directive';


// App routes
const routes: Routes = [
  { path: 'auth', loadChildren: 'app/components/login/login.module#LoginModule' },
  { path: '', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'user-control',loadChildren: 'app/components/users-control/user-control.module#UserControlModule', canActivate: [AuthGuard] },
];


@NgModule({
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    ChatComponent,
    MessageComponent,
    UserlistComponent,
    SortDirective,
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    UserControlModule,
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
