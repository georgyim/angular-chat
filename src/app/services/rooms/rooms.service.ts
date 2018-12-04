import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../entities/room';
import { NEVER, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnotifyHelperService } from '../../common/snotify-helper.service';

const api = '/api/';

@Injectable()
export class RoomService {

  public constructor(private http: HttpClient, private snotify: SnotifyHelperService) {
  }

  /**
   * Get rooms
   */
  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${api}rooms`)
      .pipe(catchError(() => {
        this.snotify.onError(null, 'Server error');
        return NEVER;
      }));
  }

  /**
   * Get room
   * @param id
   */
  public getRoom(id): Observable<Room> {
    return this.http.get<Room>(`${api}rooms/room/${id}`)
      .pipe(catchError(() => {
        this.snotify.onError(null, 'Server error');
        return NEVER;
      }));
    ;
  }
}
