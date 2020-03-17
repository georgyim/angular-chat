export class User {
  username: string;
  password?: string;
  _id?: string;


  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
