import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  /** Token */
  public token: string;

  /** Name of token as local storage key */
  private readonly tokenName: string = 'authToken';

  public constructor() {
  }

  /**
   * Get token from lStorage
   */
  public getToken(): string {
    return localStorage.getItem(this.tokenName);
  }

  /**
   * Set token
   */
  public setToken(value: any): void {
    localStorage.setItem(this.tokenName, value);
  }

  /**
   * Remove token from lStorage
   */
  public removeToken(): void {
    localStorage.removeItem(this.tokenName);
  }

  /**
   * Returns true is token was already set
   */
  public isTokenSet(): boolean {
    return Boolean(localStorage.getItem(this.tokenName));
  }
}
