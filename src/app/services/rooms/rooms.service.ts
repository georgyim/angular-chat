import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const api = '/api/';

@Injectable()
export class RoomService {

    public constructor(private http: HttpClient) { }

  /**
   * Get rooms
   */
  public getRooms() {
        return this.http.get(`${api}rooms`);
    }

  /**
   * Get room
   * @param id
   */
  public getRoom(id) {
        return this.http.get(`${api}rooms/room/${id}`);
    }
}
