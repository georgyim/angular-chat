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

  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor(private http: HttpClient, private storage: LocalStorageService, private router: Router,
    private snotify: SnotifyHelperService) {
    this.checkToken();
  }

  public login(user: User): Observable<TokenResponse> {
    let params: HttpParams = new HttpParams();
    params = params.append('username', user.username);
    params = params.append('password', user.password);

    return this.http.post<TokenResponse>(this.api + 'auth/login', params)
      .pipe(
        catchError(() => {
          this.loggedIn$.next(false);
          return EMPTY;
        }),
        tap((response: TokenResponse) => {
          this.setTokens(response.access_token);
          this.router.navigateByUrl('');
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

  private checkToken(): void {
    this.http.get<boolean>(this.api + 'users/check-token')
      .pipe(catchError(() => {
        return EMPTY;
      }))
      .subscribe(() => {
          this.router.navigate(['/chat']);
          this.loggedIn$.next(true);
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
