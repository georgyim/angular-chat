import { Message } from './message';

export class Room {

  /**
   * Title
   */
  public title: string;

  /**
   * Id
   */
  public _id: string;

  /**
   * Messages
   */

  public messages: Message[];

  /**
   * Date
   */
  public date: string;

  public constructor(title: string, _id: string, messages?: Message[]) {
    this.title = title;
    this._id = _id;
    this.messages = messages || [];
  }
}
