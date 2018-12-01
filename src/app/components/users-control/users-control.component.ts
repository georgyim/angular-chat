import { SearchFilterSortService } from './../../services/search-sort-filter/search-sort-filter.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users/users.service';
import { PaginatorService } from './../../services/paginator/paginator.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddUserComponent } from './add-user/add-user.component';
import { fadeOffAnimation } from './../../common/animation';
import { User } from '../../entities/user';
import { PaginatorHelper } from '../../services/paginator/paginator-helper';
import { CommonResult } from '../../entities/common-result';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: [ './users-control.component.css' ],
  animations: [ fadeOffAnimation ]
})
export class UsersControlComponent implements OnInit {

  public users: User[];

  public filteredUsers: User[];

  public filterField: any;

  public disabledAnimation: boolean = true;

  public pager: PaginatorHelper;

  public constructor(
    private userService: UsersService,
    private SFSService: SearchFilterSortService,
    private paginator: PaginatorService,
    public dialog: MatDialog,
  ) {
  }

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


  public deleteUser(id, Idx): void {
    this.disabledAnimation = false;
    // TODO res type
    this.userService.deleteUser(id)
      .subscribe((res: CommonResult<null>) => {
        this.filteredUsers.splice(Idx, 1);
        setTimeout(() => this.disabledAnimation = true, 0);
      });
  }

  public filter(value): void {
    this.filteredUsers = this.SFSService.search(this.users, this.filterField, [ "_id", "password" ]);
    this.setPage(1);
  }

  public sort(value): void {
    this.filteredUsers = this.SFSService.orderBy(this.filteredUsers, value);
    this.setPage(1);
  }

  setPage(page: number): void {
    this.disabledAnimation = true;
    this.pager = this.paginator.getPager(this.filteredUsers.length, page);
    if (!this.pager || page < 1 || page > this.pager.totalPages) {
      return;
    }
  }

  openAddUserModal(user?): void {
    const config = new MatDialogConfig();
    if (user) {
      config.data = user;
    }
    let dialogRef = this.dialog.open(AddUserComponent, config);

    dialogRef.afterClosed().subscribe((result: CommonResult<null>) => {
      if (result && result.success) {
        this.disabledAnimation = false;
        this.getUsers();
        setTimeout(() => this.disabledAnimation = true, 0);
      }
    });
  }

}
