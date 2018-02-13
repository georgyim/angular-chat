import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


const url = 'http://localhost:3000/api/';


@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  register(name, password) {
      let params = new HttpParams();
       params = params.append('username', name);
       params = params.append('password', password);

    return this.http.post(`${url}cats/register`, params )
  }

  login(name, password) {
      let params = new HttpParams();
      params = params.append('username', name);
      params = params.append('password', password);
    return this.http.post(`${url}auth/login`, params);
  }

  getRooms(name, password) {
      console.log('getrooms ', name, password);
      let params = new HttpParams();
      params = params.append('username', name);
      params = params.append('password', password);
      console.log('params ', params);
       return this.http.post(`${url}cats/rooms`, params);
  }

}