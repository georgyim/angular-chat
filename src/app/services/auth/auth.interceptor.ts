import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

// import { contentHeaders } from './headers';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storageService: LocalStorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes('login')) {
            return next.handle(req);
        } else {
            // Get the auth token from the service.
            const authToken = this.storageService.getToken();

            // Set content headers
            let headers = new HttpHeaders();
            headers = headers.set('authorization', authToken);

            // Clone the request to add the new header.
            const authReq = req.clone({ headers: headers });
            // Pass on the cloned request instead of the original request.
            return next.handle(authReq);
        }

    }
}
