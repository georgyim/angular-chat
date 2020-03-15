export class CommonResult<T = null> {

  public title: string;

  public message: string;

  public success: boolean;

  public additionalInfo: T;


  constructor(success: boolean, message?: string, title?: string, additionalInfo?: T) {
    this.success = success;
    this.message = message;
    this.title = title;
    this.additionalInfo = additionalInfo;
  }
}
