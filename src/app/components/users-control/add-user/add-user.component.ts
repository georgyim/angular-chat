import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from './../../../services/users/users.service';
import { User } from '../../../entities/user';
import { CommonResult } from '../../../entities/common-result';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  /**
   * User
   */
  public user: User = new User(null, null);

  /**
   * Error
   */
  public error: any;

  /**
   * Edit
   */
  public edit: boolean = false;

  public constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UsersService) {
    if (data) {
      this.user = data;
      this.edit = true;
    }
  }

  /**
   * Add User
   */
  public addUser() {
    if (!this.validate()) {
      return;
    }

    this.userService.createUser(this.user)
      .subscribe((res: User) => {
        this.dialogRef.close(res);
      });
  }

  /**
   * Edit User
   */
  public editUser() {
    if (!this.validate()) {
      return;
    }
    this.userService.editUser(this.user)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  /**
   * Validate
   * returns true if valid
   */
  public validate(): boolean {
    if (!this.user || User.checkFieldsIsEmpty(this.user)) {
      this.error = 'Please fill all fields';
      return false;
    }
    return true;
  }

  /**
   * Close dialog
   */
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
