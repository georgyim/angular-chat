import { NgModule, ModuleWithProviders } from '@angular/core';

// Services
import { DatePipe } from '@angular/common';
import { SearchFilterSortService } from '../services/search-sort-filter/search-sort-filter.service';
import { ChatService } from '../services/chat-sockets/socket.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { LocalStorageService } from '../services/auth/local-storage.service';
import { RoomService } from '../services/rooms/rooms.service';
import { SocketOne } from '../services/chat-sockets/socket-one.service';
import { UsersService } from '../services/users/users.service';
import { PaginatorService } from '../services/paginator/paginator.service';

import { SortDirective } from './../directives/sort/sort.directive';

@NgModule({
  imports: [],
  declarations: [ SortDirective ],
  exports: [ SortDirective ],
  bootstrap: []
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        DatePipe,
      ]
    };
  }
}





