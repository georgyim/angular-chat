import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from './../../../services/users/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  username: any;
  password: any;
  id: any;
  error: any;
  edit = false;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
  ) {
    if (data ) {
      this.username = data.username;
      this.password = data.password;
      this.id = data._id;
      this.edit = true;
    }
  }

  addUser() {
    if (this.validate()) return;

    this.userService.addUser(this.username, this.password)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  editUser() {
    if (this.validate()) return;

    this.userService.editUser(this.username, this.password, this.id)
      .subscribe(res => {
        console.log(res);
      });
  }

  validate() {
    if (!this.username || !this.password || this.username.trim() === '' || this.password.trim() === '') {
      this.error = 'Please fill all fields';
      return true;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
