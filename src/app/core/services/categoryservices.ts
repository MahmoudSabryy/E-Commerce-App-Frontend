import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Categoryservices {
  private readonly _HttpClient = inject(HttpClient);

  myHeaders: any = { authorization: localStorage.getItem('userToken') };

  getAllSubCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/subcategory`);
  }

  getAllRealCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/category`);
  }

  getAllProductsByCaterory(_id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/product/bycategory/${_id}`);
  }

  getCategoryById(_id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/category/${_id}`);
  }

  addCategory(data: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/category`, data, {
      headers: this.myHeaders,
    });
  }

  updateCategory(_id: string, data: any): Observable<any> {
    return this._HttpClient.patch(`${environment.baseURI}/category/${_id}`, data, {
      headers: this.myHeaders,
    });
  }

  deleteCategory(_id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURI}/category/${_id}`, {
      headers: this.myHeaders,
    });
  }
}
