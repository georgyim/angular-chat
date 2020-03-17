import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { SnotifyHelperService } from '../../common/snotify-helper.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthenticationService, private router: Router, private snotify: SnotifyHelperService,
    private storage: LocalStorageService) {
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
          this.snotify.onWarning('Sorry, you are not logged in.', null)
          this.router.navigate([ '/auth' ]);
        }
      }));
  }
}


