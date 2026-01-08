import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly _HttpClient = inject(HttpClient);

  private readonly _Router = inject(Router);

  userDataFromToken: any = null;

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/auth/register`, data);
  }

  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/auth/login`, data);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userDataFromToken = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userDataFromToken = null;
    this._Router.navigate(['/login']);
  }

  verifyEmailForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/auth/forgetpassword`, data);
  }

  verifyOtpForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/auth/confirmotp`, data);
  }

  changeForgetPasswordForm(data: object): Observable<any> {
    return this._HttpClient.patch(`${environment.baseURI}/auth/changepassword`, data);
  }
}
