import { Injectable, NgModule } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketOne extends Socket {

    constructor() {
        super({
            url: '', options: {
                'query': 'token=' + localStorage.getItem('authToken')
            }
        });
    }

}
