import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { CommonResult } from '../entities/common-result';
import { SnotifyHelperService } from './snotify-helper.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  public readonly defaultTitle: string = 'Error';

  constructor(private snotifyHelper: SnotifyHelperService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (this.checkInstance(err.error)) {
              this.snotifyHelper.onError(err.error.message, err.error.title || this.defaultTitle);
            }
          }
        })
      );
  }

  private checkInstance(arg: any): arg is CommonResult<any> {
    return Boolean(arg && arg.hasOwnProperty('success') && arg.message);
  }
}

