import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { User } from '../..//entities/user';

const api = '/api/';


@Injectable()
export class UsersService {

  public constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get(`${api}users/get-users`);
  }

  public addUser(user: User) {
    let body = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);

    return this.http.post(`${api}users/create`, body);
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
