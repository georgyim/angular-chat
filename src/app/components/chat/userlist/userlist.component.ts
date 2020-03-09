import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserlistComponent implements OnInit {

  @Input() users: User[];

  constructor() { }

  ngOnInit() {
  }

}
