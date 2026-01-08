import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Userservices {
  private readonly _HttpClient = inject(HttpClient);
  myHeaders: any = { authorization: localStorage.getItem('userToken') };

  getUserData(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/user`, { headers: this.myHeaders });
  }
  updateUserData(data: any): Observable<any> {
    return this._HttpClient.put(`${environment.baseURI}/user/updateprofile`, data, {
      headers: this.myHeaders,
    });
  }
}
