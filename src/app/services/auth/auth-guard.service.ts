import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { SnotifyHelperService } from '../../common/snotify-helper.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthenticationService, private router: Router, private snotify: SnotifyHelperService,
  ) {
  }

  canActivate(): boolean {
    return this.checkIfLoggedIn();
  }

  canActivateChild(): boolean {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): boolean {
    const isLoggedIn: boolean = this.authService.isLoggedIn();
    if (isLoggedIn) {
      return true;
    } else {
      this.snotify.onWarning('Sorry, you are not logged in.', null)
      this.router.navigate(['/auth']);
      return false;
    }
  }
}


