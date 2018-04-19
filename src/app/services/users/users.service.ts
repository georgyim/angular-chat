import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

const api = 'http://localhost:3000/api/';


@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(`${api}users/get-users`);
  }

  addUser(username, password) {
    let body = new HttpParams();
    body = body.append('username', username);
    body = body.append('password', password);

    return this.http.post(`${api}users/create`, body);
  }

  deleteUser(id) {
    return this.http.delete(`${api}users/delete/${id}`);
  }

  editUser(username, password, id) {
    let body = new HttpParams();
    body = body.append('username', username);
    body = body.append('password', password);

    return this.http.put(`${api}users/edit/${id}`, body);
  }

}
