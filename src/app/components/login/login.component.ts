import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthenticationService } from './../../services/auth/authentication.service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnDestroy {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.minLength(2), Validators.maxLength(10), Validators.required ]),
    password: new FormControl('', [ Validators.minLength(2), Validators.maxLength(10), Validators.required ]),
  });

  public user: User = new User();

  public error: string;

  public alert: string;

  public errorSubscription$: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  login() {
    this.authenticationService.login(this.user);
    this.loginErrorHandler();
  }

  register() {
    this.authenticationService.register(this.user)
      .subscribe((res: User) => {
        // TODO wtf is that lol
        if (res && res[ 'err' ]) {
          this.error = res[ 'err' ];
        } else {
          this.error = null;
          this.alert = 'User succesfully register, now you can login.';
          setTimeout(() => this.alert = null, 3000);
        }
      }, err => {
        console.warn(err);
      });
  }

  loginErrorHandler() {
    this.errorSubscription$ = this.authenticationService.error$
      .subscribe((res) => {
        this.error = res === true ? 'Auth failed' : '';
      });
  }

  ngOnDestroy() {
    if (this.errorSubscription$) {
      this.errorSubscription$.unsubscribe();
    }
  }

}
