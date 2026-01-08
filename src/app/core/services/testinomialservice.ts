import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Testinomialservice {
  private readonly _HttpClient = inject(HttpClient);

  myHeaders: any = { authorization: localStorage.getItem('userToken') };

  createTest(data: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/testinomial`, data, {
      headers: this.myHeaders,
    });
  }
  getTest(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/testinomial`, {
      headers: this.myHeaders,
    });
  }
  updateTest(id: string, data: any): Observable<any> {
    return this._HttpClient.patch(`${environment.baseURI}/testinomial/${id}`, data, {
      headers: this.myHeaders,
    });
  }

  deleteTest(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURI}/testinomial/${id}`, {
      headers: this.myHeaders,
    });
  }
}
