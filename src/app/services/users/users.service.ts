import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../..//entities/user';
import {Observable} from 'rxjs';
import { CommonResult } from '../../entities/common-result';

const api = '/api/';

@Injectable()
export class UsersService {

  public constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${api}users/get-users`);
  }

  public addUser(user: User): Observable<CommonResult<null>> {
    let body: HttpParams = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);
    return this.http.post<CommonResult<null>>(`${api}users/create`, body);
  }

  public deleteUser(id: string): Observable<CommonResult<null>> {
    return this.http.delete<CommonResult<null>>(`${api}users/delete/${id}`);
  }

  public editUser(user: User): Observable<CommonResult<null>> {
    let body = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);
    return this.http.put<CommonResult<null>>(`${api}users/edit/${user._id}`, body);
  }
}
