import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(private storageService: LocalStorageService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login')) {
      return next.handle(req);
    } else {
      const authToken = this.storageService.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + authToken);
      const authReq = req.clone({ headers: headers });
      return next.handle(authReq);
    }
  }
}
