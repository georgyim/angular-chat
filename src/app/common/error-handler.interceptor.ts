import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { CommonResult } from '../entities/common-result';
import { SnotifyHelperService } from './snotify-helper.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  public readonly defaultTitle: string = 'Error';

  constructor(private snotifyHelper: SnotifyHelperService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .do((event: HttpEvent<any>) => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (this.checkInstance(err.error)) {
            this.snotifyHelper.onError(err.error.message, err.error.title || this.defaultTitle);
          }
        }
      });
  }

  private checkInstance(arg: any): arg is CommonResult<any> {
    return Boolean(arg && arg.hasOwnProperty('success') && arg.message);
  }
}

