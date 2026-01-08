import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Salesreportservice {
  private readonly _HttpClient = inject(HttpClient);

  myHeaders: any = { authorization: localStorage.getItem('userToken') };

  getSalesReport(start: string, end: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/report?startDate=${start}&endDate=${end}`, {
      headers: this.myHeaders,
    });
  }
}
