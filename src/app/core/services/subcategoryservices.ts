import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Subcategoryservices {
  private readonly _HttpClient = inject(HttpClient);

  myHeaders: any = { authorization: localStorage.getItem('userToken') };

  getAllSubCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/subcategory`);
  }

  addSubcategory(data: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/subcategory`, data, {
      headers: this.myHeaders,
    });
  }

  removeSubCategoryById(_id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURI}/subcategory/${_id}`, {
      headers: this.myHeaders,
    });
  }

  updateSubCategoryById(_id: string, data: any): Observable<any> {
    return this._HttpClient.patch(`${environment.baseURI}/subcategory/${_id}`, data, {
      headers: this.myHeaders,
    });
  }
}
