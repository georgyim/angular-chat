import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthenticationService } from './../../services/auth/authentication.service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.minLength(2), Validators.maxLength(10), Validators.required]),
    password: new FormControl('', [Validators.minLength(2), Validators.maxLength(10), Validators.required]),
  });
  username: string;
  password: string;
  error: string;
  alert: string;
  registerSubscription$: Subscription;
  errorSubscription$: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.isLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.router.navigateByUrl('');
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.username, this.password);
    this.loginErrorHandler();
  }

  register() {
    this.registerSubscription$ = this.authenticationService.register(this.username, this.password)
      .subscribe((res: User) => {
        if (res && res['err']) {
          this.error = res['err'];
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
        res === true ? this.error = 'Auth failed' : '';
      });
  }

  ngOnDestroy() {
    if (this.registerSubscription$) {
      this.registerSubscription$.unsubscribe();
    }
    if (this.errorSubscription$) {
      this.errorSubscription$.unsubscribe();
    }
  }

}
