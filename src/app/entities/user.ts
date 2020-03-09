export class User {

  /**
   * Password
   */
  public password: string;

  /**
   * Username
   */
  public username: string;

  /**
   * Id
   */
  public _id: string;


  public constructor(username: string = null, password: string = null, _id?: string) {
    this.username = username;
    this.password = password;
    this._id = _id;
  }

  /**
   * returns true if fields not filled
   */
  public checkFieldsIsEmpty(): boolean {
    if (!this.username || !this.password || !this.username.trim() || !this.password.trim()) {
      return true;
    } else {
      return false;
    }
  }
}
