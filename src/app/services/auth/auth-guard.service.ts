import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  private loggedIn = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private storage: LocalStorageService
  ) {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });

  }

  canActivate(): boolean {
    return this.checkIfLoggedIn();
  }

  canActivateChild(): boolean {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): boolean {

    // if token exist
    if (this.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

}


