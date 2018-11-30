import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../..//entities/user';
import {Observable} from 'rxjs';

const api = '/api/';

@Injectable()
export class UsersService {

  public constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${api}users/get-users`);
  }

  public addUser(user: User): Observable<User> {
    let body: HttpParams = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);
    return this.http.post<User>(`${api}users/create`, body);
  }

  public deleteUser(id: string) {
    return this.http.delete(`${api}users/delete/${id}`);
  }

  public editUser(user: User) {
    let body = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);
    return this.http.put(`${api}users/edit/${user._id}`, body);
  }
}
