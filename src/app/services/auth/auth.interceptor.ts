import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(private storageService: LocalStorageService, private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login')) {
      return next.handle(req);
    } else {
      const authToken: string = this.storageService.getToken();
      if (authToken) {
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + authToken
          }
        });
        return next.handle(req);
      }
      this.router.navigate(['/auth']);
      return next.handle(req);
    }
  }
}
