import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, NEVER, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnotifyHelperService } from '../../common/snotify-helper.service';
import { User } from '../../entities/user';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private readonly api = '/api/';

  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.storage.getToken());

  public constructor(private http: HttpClient, private storage: LocalStorageService, private router: Router,
    private snotify: SnotifyHelperService) {
  }

  public login(user: User): Observable<AcessToken> {
    let params: HttpParams = new HttpParams();
    params = params.append('username', user.username);
    params = params.append('password', user.password);

    return this.http.post<AcessToken>(this.api + 'auth/login', params)
      .pipe(
        catchError(() => {
          this.loggedIn$.next(false);
          return EMPTY;
        }),
        tap((response: AcessToken) => {
          this.setTokens(response.value);
          this.router.navigateByUrl('/chat');
        })
      )
  }

  public setTokens(token: string): void {
    if (token) {
      this.storage.setToken(token);
      this.loggedIn$.next(true);
    } else {
      this.storage.setToken(null);
      this.loggedIn$.next(false);
    }
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  public logout(): void {
    this.storage.removeToken();
    this.loggedIn$.next(false);
    this.router.navigate(['/auth']);
  }

  public getProfile(): Observable<JwtVerifyAnswer> {
    return this.http.get<JwtVerifyAnswer>(this.api + 'users/get-profile');
  }

  public register(user: User): Observable<User> {
    let params: HttpParams = new HttpParams();
    params = params.append('username', user.username);
    params = params.append('password', user.password);
    return this.http.post<User>(`${this.api}users/create`, params)
      .pipe(catchError(() => {
        return NEVER;
      }));
  }


}

export interface AcessToken {
  expireTime: string;
  value: string;
}

export interface JwtVerifyAnswer {
  exp: number;
  iat: number;
  username: string;
}
