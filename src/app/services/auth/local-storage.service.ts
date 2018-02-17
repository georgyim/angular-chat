import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private token = '';

  constructor() { }

  getToken(): string {

    if (this.token === '') {
      const token = this.getTokenFromStorage();
      this.token = token;
      return this.token;
    } else {
      return this.token;
    }
  }

  private getTokenFromStorage() {
    if (localStorage.getItem('authToken')) {
      const authToken = localStorage.getItem('authToken');
      const token = authToken;
      if (token) {
        this.token = token;
        return token;
      } else {
        this.token = '';
        return '';
      }
    }
  }


  setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.token = token;
  }

  removeTokens(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  removeUser(): void {
    localStorage.removeItem('authUser');
  }


}
