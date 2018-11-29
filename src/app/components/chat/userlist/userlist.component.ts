import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  @Input() users: User[];

  constructor() { }

  ngOnInit() {
  }

}