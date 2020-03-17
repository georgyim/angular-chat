import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../entities/user';
import { SnotifyHelperService } from '../../common/snotify-helper.service';
import { CommonResult } from '../../entities/common-result';

const api = '/api/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  public constructor(private http: HttpClient, private snotify: SnotifyHelperService) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${api}/get-users`);
  }

  public createUser(user: User): Observable<User> {
    let body: HttpParams = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);
    return this.http.post<User>(`${api}/create`, body)
      .pipe(catchError(() => {
        return EMPTY;
      }));
  }

  public deleteUser(id: string): Observable<CommonResult> {
    return this.http.delete<CommonResult>(`${api}/delete/${id}`)
      .pipe(catchError(() => {
        return EMPTY;
      }));
  }

  public editUser(user: User): Observable<CommonResult> {
    let body = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);
    return this.http.put<CommonResult>(`${api}/edit/${user._id}`, body)
      .pipe(catchError(() => {
        return EMPTY;
      }));

  }

  public getProfile(): Observable<User> {
    return this.http.get<User>(`${api}/get-profile`);
  }
}
