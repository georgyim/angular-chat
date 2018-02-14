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
          console.log(localStorage.getItem('authToken'));
          const authToken = localStorage.getItem('authToken');
          console.log('authToken', authToken);
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
    
      // tokenNotExpired(token: string): boolean {
    
      //   if (token) {
      //     // if token not expired return true
      //     const isExpired = this.jwtHelper.isTokenExpired(token); // this.jwtHelper.(null, token);
      //     if (isExpired === true) {
      //       return false;
      //     } else {
      //       return true;
      //     }
      //   } else {
      //     console.error('Token not provided.');
      //     return false;
      //   }
      // }
    
      setToken(token: string) {
        // store jwt token in local sotrage to keep user logged in between page refreshes
        localStorage.setItem('authToken', 'Bearer ' + token );
        this.token = token;
      }
    
      // getRefreshToken() {
      //   const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
      //   const token = refreshToken && refreshToken.token;
    
      //   if (token) {
      //     return token;
      //   } else {
      //     return '';
      //   }
      // }
    
      // setRefreshToken(token: string) {
      //   // store jwt token in local sotrage to keep user logged in between page refreshes
      //   localStorage.setItem('refreshToken', JSON.stringify({
      //     token: token
      //   }));
      // }
    
      removeTokens(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
      }
    
    
      // getUser() {
      //   return JSON.parse(localStorage.getItem('authUser'));
      // }
    
      // setUser(userObject) {
      //   // store user data: username, firstname, lastnamet and job title
      //   localStorage.setItem('authUser', JSON.stringify({
      //     username: userObject.email,
      //     firstName: userObject.firstName,
      //     lastName: userObject.lastName,
      //     title: userObject.title
      //   }));
      // }
    
      removeUser(): void {
        localStorage.removeItem('authUser');
      }
    

}
