// Core

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';


// Modules
import { SharedModule } from './shared/shared.module';
import { UserControlModule } from './components/users-control/user-control.module';

// Other
import { SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthGuard } from './services/auth/auth-guard.service';
import { UserlistComponent } from './components/chat/userlist/userlist.component';

// App routes
const routes: Routes = [
  {path: 'chat', component: ChatComponent, canActivate: [ AuthGuard ]},

  {path: 'auth', loadChildren: 'app/components/login/login.module#LoginModule'},
  {
    path: 'user-control', canActivate: [ AuthGuard ],
    loadChildren: 'app/components/users-control/user-control.module#UserControlModule'
  },

  {path: '', component: ChatComponent, canActivate: [ AuthGuard ], pathMatch: 'full'},


];

@NgModule({
  entryComponents: [],
  declarations: [
    AppComponent,
    MenuComponent,
    ChatComponent,
    MessageComponent,
    UserlistComponent,
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
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}
