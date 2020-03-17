import { ContainerComponent } from './components/container/container.component';
// Core

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Modules
import { SharedModule } from './shared/shared.module';
// import { UserControlModule } from './components/users-control/user-control.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

// Other
import { SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthGuard } from './services/auth/auth-guard.service';
import { UserlistComponent } from './components/chat/userlist/userlist.component';
import { ErrorHandlerInterceptor } from './common/error-handler.interceptor';
import { SnotifyHelperService } from './common/snotify-helper.service';
import { LoginComponent } from './components/login/login.component';

// App routes
const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: '',
    component: ContainerComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'user-control',
        loadChildren: () => import('./components/users-control/user-control.module').then(m => m.UserControlModule)
      },
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
      },
    ]
  },

];

@NgModule({
  entryComponents: [],
  declarations: [
    AppComponent,
    MenuComponent,
    ChatComponent,
    MessageComponent,
    UserlistComponent,
    ContainerComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    // UserControlModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    SocketIoModule,
    HttpClientModule,
    SnotifyModule,
  ],
  providers: [
    AuthGuard,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    SnotifyHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
