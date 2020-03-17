import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnotifyHelperService } from './snotify-helper.service';
import { AuthenticationService } from '../services/auth/authentication.service';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  private readonly defaultTitle: string = 'Error';

  constructor(private snotifyHelper: SnotifyHelperService, private authService: AuthenticationService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && this.checkErrorHaveMessage(err.error)) {
              this.snotifyHelper.onError(err.error.message, err.error.title || this.defaultTitle);
          }
          return throwError(err);
        })
      );
  }

  private checkErrorHaveMessage(value: any): boolean {
    return Boolean(value && value.message);
  }
}

