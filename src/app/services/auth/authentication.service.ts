import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from './local-storage.service';

const api = 'http://localhost:3000/api/';

@Injectable()
export class AuthenticationService {

  public token: string;
  public error$ = new BehaviorSubject<boolean>(false);
  private loggedIn$ = new BehaviorSubject<boolean>(this.storage.getToken() != null ? true : false);
  private userName: string;
  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) {
    this.token = this.storage.getToken();
    this.checkToken();
  }

  login(username, password): void {
    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('password', password);

    this.http.post(api + 'auth/login', params)
      .subscribe((response: any) => {
        this.setTokens(response);
      }, () => {
        this.loggedIn$.next(false);
        this.error$.next(true);
      });
  }

  setTokens(response: any) {
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

  getProfile() {
    return this.http.get(api + 'users/get-profile');
  }

  register(name, password) {
    let params = new HttpParams();
    params = params.append('username', name);
    params = params.append('password', password);

    return this.http.post(`${api}users/create`, params);
  }

  checkToken() {
    this.http.get(api + 'users/check-token')
      .subscribe( (res: boolean) => {
        this.loggedIn$.next(res);
      }, () => this.loggedIn$.next(false));
  }
}
