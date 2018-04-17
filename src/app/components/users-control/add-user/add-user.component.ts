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
  error: any;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
  ) { }

  addUser() {
    if (!this.username || !this.password || this.username.trim() === '' || this.password.trim() === '') {
      this.error = 'Please fill all fields';
      return;
    }
    this.userService.addUser(this.username, this.password)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
