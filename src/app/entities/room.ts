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

  // TODO delete
  public _v: number;

  public constructor(title: string, _id: string, _v: number, messages?: Message[]) {
    this.title = title;
    this._id = _id;
    this._v = _v;
    this.messages = messages || [];
  }
}
