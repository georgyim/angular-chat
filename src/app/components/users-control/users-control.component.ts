import { SearchFilterSortService } from './../../services/search-sort-filter/search-sort-filter.service';
import { SortDirective } from './../../directives/sort/sort.directive';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users/users.service';
import { SlicePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorService } from './../../services/paginator/paginator.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddUserComponent } from './add-user/add-user.component';
import { fadeOffAnimation } from './../../common/animation';
import {User} from '../../entities/user';
import {PaginatorHelper} from '../../services/paginator/paginator-helper';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.css'],
  animations: [fadeOffAnimation]
})
export class UsersControlComponent implements OnInit {

  public users: User[];

  public filteredUsers: User[];

  public filterField: any;

  public disabledAnimation: boolean = true;

  public pager: PaginatorHelper;

  public pagedItems: any[];

  public constructor(
    private userService: UsersService,
    private SFSService: SearchFilterSortService,
    private paginator: PaginatorService,
    public dialog: MatDialog,
  ) { }

  public ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .subscribe((res: User[]) => {
        this.users = res;
        this.filteredUsers = res;
        this.setPage(1);
      });
  }


  public deleteUser(id, Idx) {
    this.disabledAnimation = false;
    // TODO res type
    this.userService.deleteUser(id)
      .subscribe((res: any) => {
        this.filteredUsers.splice(Idx, 1);
        this.pagedItems.splice(Idx, 1);
        setTimeout(() => this.disabledAnimation = true, 0);
      });
  }


  filter(value) {
    this.filteredUsers = this.SFSService.search(this.users, this.filterField, ["_id", "password"]);
    this.setPage(1);
  }

  sort(value) {
    this.filteredUsers = this.SFSService.orderBy(this.filteredUsers, value);
    this.setPage(1);
  }

  setPage(page: number) {
    this.disabledAnimation = true;

    this.pager = this.paginator.getPager(this.filteredUsers.length, page);

    if (!this.pager || page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pagedItems = this.filteredUsers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log('this.pagedItems')
  }




  openAddUserModal(user?): void {
    const config = new MatDialogConfig();
    if (user) {
      config.data = user;
    }
    let dialogRef = this.dialog.open(AddUserComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== undefined) {
        this.disabledAnimation = false;
        this.pagedItems.unshift(result);
        setTimeout(() => this.disabledAnimation = true, 0);
      }
    });
  }

}
