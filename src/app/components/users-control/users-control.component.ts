import { SortDirective } from './../../directives/sort/sort.directive';
import { SearchFilterSortService } from './../../services/filter/filter.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users/users.service';
import { SlicePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.css']
})
export class UsersControlComponent implements OnInit {

  public users: any;
  public filteredUsers;
  filterField: any;

  constructor(private userService: UsersService, private filterService: SearchFilterSortService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.filteredUsers = res;
      });
  }

  filter(value) {
    this.filteredUsers = this.filterService.search(this.users, this.filterField, ["_id", "password"])
  }

  sort(value) {
    this.filteredUsers = this.filterService.orderBy(this.filteredUsers, value);
  }
}
