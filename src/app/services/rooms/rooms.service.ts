import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnotifyHelperService } from '../../common/snotify-helper.service';
import { Room } from '../../entities/room';

const api = '/api/';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  public constructor(private http: HttpClient, private snotify: SnotifyHelperService) {
  }

  /**
   * Get rooms
   */
  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${api}rooms`)
      .pipe(catchError(() => {
        return EMPTY;
      }));
  }

  /**
   * Get room
   * @param id
   */
  public getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(`${api}rooms/room/${id}`)
      .pipe(catchError(() => {
        return EMPTY;
      }));
    ;
  }
}
