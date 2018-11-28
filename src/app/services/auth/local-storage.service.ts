import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private token: string;

  public constructor() {
  }

  public getToken(): string {
    if (!this.token) {
      this.token = this.getTokenFromStorage();
      return this.token;
    } else {
      return this.token;
    }
  }

  public getTokenFromStorage(): string {
    if (localStorage.getItem('authToken')) {
      const token: string = localStorage.getItem('authToken');
      this.token = token || null;
      return this.token;
    }
  }

  public setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.token = token;
  }

  public removeTokens(): void {
    this.token = null;
    localStorage.removeItem('authToken');
  }
}
