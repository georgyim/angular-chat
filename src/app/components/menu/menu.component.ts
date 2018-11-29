import { AuthenticationService } from './../../services/auth/authentication.service';
import { AsyncPipe } from '@angular/common/src/pipes/async_pipe';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  public constructor(public authService: AuthenticationService, private router: Router) { }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
