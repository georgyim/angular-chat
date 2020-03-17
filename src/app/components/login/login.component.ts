import { UsersService } from '../../services/users/users.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnotifyHelperService } from '../../common/snotify-helper.service';
import { User } from '../../entities/user';
import { AuthenticationService } from './../../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.minLength(2), Validators.maxLength(10), Validators.required]),
    password: new FormControl('', [Validators.minLength(2), Validators.maxLength(10), Validators.required]),
  });

  public user: User = new User();

  constructor(
    private authenticationService: AuthenticationService,
    private snotify: SnotifyHelperService,
    private userService: UsersService
  ) {
  }

  login() {
    this.authenticationService.login(this.user)
      .subscribe();
  }

  register() {
    this.userService.createUser(this.user)
      .subscribe((res: User) => {
        this.snotify.onSuccess('User succesfully register, now you can login.', null)
      });
  }
}
