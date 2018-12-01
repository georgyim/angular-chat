import { AuthenticationService } from './../../services/auth/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
})
export class MenuComponent {

  public constructor(public authService: AuthenticationService) {
  }

  public logout(): void {
    this.authService.logout();
  }
}
