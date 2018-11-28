import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {
  private readonly api = '/api';
  public token: string;
  public error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.storage.getToken() != null ? true : false);

  public constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.token = this.storage.getToken();
    this.checkToken();
  }

  login(username, password): void {
    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('password', password);

    this.http.post(this.api + 'auth/login', params)
      .subscribe((response: any) => {
        this.setTokens(response);
      }, () => {
        this.loggedIn$.next(false);
        this.error$.next(true);
      });
  }

  setTokens(response: any): void {
    const accessToken = response && response.access_token;
    if (accessToken) {
      this.token = accessToken;
      this.storage.setToken(accessToken);
      this.loggedIn$.next(true);
    } else {
      this.loggedIn$.next(false);
    }
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedIn$;
  }

  logout(): void {
    this.token = '';
    this.storage.removeTokens();
    this.loggedIn$.next(false);
  }

  getProfile(): Observable<Object> {
    return this.http.get(this.api + 'users/get-profile');
  }

  register(name, password): Observable<Object> {
    let params = new HttpParams();
    params = params.append('username', name);
    params = params.append('password', password);
    return this.http.post(`${this.api}users/create`, params);
  }

  checkToken() {
    this.http.get(this.api + 'users/check-token')
      .subscribe((res: boolean) => {
        if (res) {
          this.loggedIn$.next(res);
        } else {
          this.loggedIn$.next(false);
          this.router.navigate([ '/auth' ]);
        }
      }, () => {
        // TODO
      });
  }
}
