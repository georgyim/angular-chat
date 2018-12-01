import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../entities/room';
import { Observable } from 'rxjs';

const api = '/api/';

@Injectable()
export class RoomService {

    public constructor(private http: HttpClient) { }

  /**
   * Get rooms
   */
  public getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(`${api}rooms`);
    }

  /**
   * Get room
   * @param id
   */
  public getRoom(id): Observable<Room> {
        return this.http.get<Room>(`${api}rooms/room/${id}`);
    }
}
