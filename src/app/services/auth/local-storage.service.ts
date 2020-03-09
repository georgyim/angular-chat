import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  /** Token */
  public token: string;

  /** Name of token as local storage key */
  private readonly tokenName: string = 'authToken';

  public constructor(@Inject(PLATFORM_ID) private platformId) {
  }

  public getItem(key: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key)
    }
  }

  /**
   * Get token from lStorage
   */
  public getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenName);
    }
  }

  /**
   * Set token
   */
  public setToken(value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenName, value);
    }
  }

  /**
   * Remove token from lStorage
   */
  public removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenName);
    }
  }

  /**
   * Returns true is token was already set
   */
  public isTokenSet(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return Boolean(localStorage.getItem(this.tokenName));
    }
  }
}
