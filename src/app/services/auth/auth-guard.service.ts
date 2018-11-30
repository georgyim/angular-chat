import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.checkIfLoggedIn();
  }

  canActivateChild(): Observable<boolean> {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn()
      .pipe(tap((result: boolean) => {
        if (!result) {
          this.router.navigate(['/auth']);
        }
      }));
  }
}


