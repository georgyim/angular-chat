import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, NEVER } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { catchError } from 'rxjs/operators';
import { SnotifyHelperService } from '../../common/snotify-helper.service';


@Injectable()
export class AuthenticationService {

  private readonly api = '/api/';

  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor(private http: HttpClient, private storage: LocalStorageService, private router: Router,
                     private snotify: SnotifyHelperService) {
    this.checkToken();
  }

  public login(user: User): void {
    let params: HttpParams = new HttpParams();
    params = params.append('username', user.username);
    params = params.append('password', user.password);

    this.http.post<TokenResponse>(this.api + 'auth/login', params)
      .pipe(catchError(() => {
        this.loggedIn$.next(false);
        this.snotify.onError('Login unsuccessful', null);
        return NEVER;
      }))
      .subscribe((response: TokenResponse) => {
        this.setTokens(response.access_token);
        this.router.navigateByUrl('');
      });
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
    this.router.navigate([ '/auth' ]);
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
        this.snotify.onError('Register unsuccessful', null);
        return NEVER;
      }));
  }

  public checkToken(): void {
    this.http.get<boolean>(this.api + 'users/check-token')
      .pipe(catchError(() => {
        this.snotify.onError('Server error', null);
        return NEVER;
      }))
      .subscribe((res: boolean) => {
        if (res) {
          this.loggedIn$.next(res);
        } else {
          this.loggedIn$.next(false);
          this.router.navigate([ '/auth' ]);
        }
      });
  }
}

interface TokenResponse {
  expires_in: string;
  access_token: string;
}

export interface JwtVerifyAnswer {
  exp: number;
  iat: number;
  username: string;
}
