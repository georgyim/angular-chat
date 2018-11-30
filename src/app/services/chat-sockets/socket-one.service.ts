import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketOne extends Socket {

  public constructor() {
    super({
      url: '', options: {
        'query': 'token=' + localStorage.getItem('authToken')
      }
    });
  }

}
