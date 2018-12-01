import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(private storageService: LocalStorageService, private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    const authReq = req.clone({ headers: headers });
    if (req.url.includes('login')) {
      return next.handle(req);
    } else {
      const authToken = this.storageService.getToken();
      if (authToken) {
        headers = headers.set('Authorization', 'Bearer ' + authToken);
        return next.handle(authReq);
      }
      this.router.navigate([ '/auth' ]);
      return next.handle(authReq);
    }
  }
}
