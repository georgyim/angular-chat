import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/auth/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.minLength(2), Validators.maxLength(10), Validators.required]),
    password: new FormControl('', [Validators.minLength(2), Validators.maxLength(10), Validators.required]),
  });
  username: string;
  password: string;
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
}

  register() {
    this.authenticationService.register(this.username, this.password)
      .subscribe(res => {
      }, err => {
        console.warn(err);
      });
  }

}
