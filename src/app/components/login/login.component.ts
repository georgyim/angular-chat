import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './../../services/auth/authentication.service';
import { User } from '../../entities/user';
import { SnotifyHelperService } from '../../common/snotify-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.minLength(2), Validators.maxLength(10), Validators.required ]),
    password: new FormControl('', [ Validators.minLength(2), Validators.maxLength(10), Validators.required ]),
  });

  public user: User = new User();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private snotify: SnotifyHelperService
  ) {
  }

  login() {
    this.authenticationService.login(this.user);
  }

  register() {
    this.authenticationService.register(this.user)
      .subscribe((res: User) => {
        this.snotify.onSuccess('User succesfully register, now you can login.', null)
      });
  }
}
