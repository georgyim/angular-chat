import { SearchFilterSortService } from './../../services/search-sort-filter/search-sort-filter.service';
import { SortDirective } from './../../directives/sort/sort.directive';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users/users.service';
import { SlicePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorService } from './../../services/paginator/paginator.service';
import { MatDialog } from '@angular/material';
import { AddUserComponent } from './add-user/add-user.component';


@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.css']
})
export class UsersControlComponent implements OnInit {

  public users: any;
  public filteredUsers;
  filterField: any;

  pager: any = {};
  pagedItems: any[];

  constructor(
    private userService: UsersService,
    private SFSService: SearchFilterSortService,
    private paginator: PaginatorService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.filteredUsers = res;
        this.setPage(1);
      });
  }



  filter(value) {
    this.filteredUsers = this.SFSService.search(this.users, this.filterField, ["_id", "password"]);
  }

  sort(value) {
    this.filteredUsers = this.SFSService.orderBy(this.filteredUsers, value);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.paginator.getPager(this.filteredUsers.length, page);

    // get current page of items
    this.pagedItems = this.filteredUsers.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  openAddUserModal(): void {
    let dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== undefined) {
        console.log(result);
      }
    });
  }

}
