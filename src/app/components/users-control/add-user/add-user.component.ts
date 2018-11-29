import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from './../../../services/users/users.service';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  /**
   * User
   */
  public user: User;

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService) {
    if (data) {
      this.user = new User(data.username, data.password, data._id);
      this.edit = true;
    }
  }

  /**
   * Add User
   */
  public addUser() {
    if (!this.validate()) {
      return;
    };

    this.userService.addUser(this.user)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  /**
   * Edit User
   */
  public editUser() {
    if (this.validate()) return;

    this.userService.editUser(this.user)
      .subscribe(res => {
        console.log(res);
      });
  }

  /**
   * Validate
   * returns true if valid
   */
  public validate(): boolean {
    if (!this.user || this.user.checkFieldsIsEmpty()) {
      this.error = 'Please fill all fields';
      return false;
    }
  }

  // TODO ???
  public onNoClick(): void {
    this.dialogRef.close();
  }
}
