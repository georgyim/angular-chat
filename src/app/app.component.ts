import { Component } from '@angular/core';
import { SnotifyHelperService } from './common/snotify-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  constructor(public snotifyHelper: SnotifyHelperService) {
  }

  public getSnotifyStyle(): string {
    return this.snotifyHelper.getStyle();
  }
}
