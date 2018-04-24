import { Component, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  isBrowser;
  constructor(@Inject(PLATFORM_ID) private platformId) { 
     this.isBrowser = isPlatformBrowser(platformId);
  }


}
