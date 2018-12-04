import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../..//entities/user';
import { NEVER, Observable } from 'rxjs';
import { CommonResult } from '../../entities/common-result';
import { catchError } from 'rxjs/operators';
import { SnotifyHelperService } from '../../common/snotify-helper.service';

const api = '/api/';

@Injectable()
export class UsersService {

  public constructor(private http: HttpClient, private snotify: SnotifyHelperService) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${api}users/get-users`);
  }

  public addUser(user: User): Observable<CommonResult<null>> {
    let body: HttpParams = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);
    return this.http.post<CommonResult<null>>(`${api}users/create`, body)
      .pipe(catchError(() => {
        this.snotify.onError(null, 'Server error');
        return NEVER;
      }));
  }

  public deleteUser(id: string): Observable<CommonResult<null>> {
    return this.http.delete<CommonResult<null>>(`${api}users/delete/${id}`)
      .pipe(catchError(() => {
        this.snotify.onError(null, 'Server error');
        return NEVER;
      }));
  }

  public editUser(user: User): Observable<CommonResult<null>> {
    let body = new HttpParams();
    body = body.append('username', user.username);
    body = body.append('password', user.password);
    return this.http.put<CommonResult<null>>(`${api}users/edit/${user._id}`, body)
      .pipe(catchError(() => {
        this.snotify.onError(null, 'Server error');
        return NEVER;
      }));
    ;
  }
}
