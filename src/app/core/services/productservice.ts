import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  private readonly _HttpClient = inject(HttpClient);

  myHeaders: any = { authorization: localStorage.getItem('userToken') };

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/product`);
  }

  getSpecificProductsById(id: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/product/${id}`);
  }

  getSpecificProductsBySlug(slug: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/product/slug/${slug}`);
  }

  addProduct(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/product/add`, data, {
      headers: this.myHeaders,
    });
  }

  adminGetAllProducts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/product/allproducts`, {
      headers: this.myHeaders,
    });
  }

  updateProduct(_id: string, data: any) {
    return this._HttpClient.put(`${environment.baseURI}/product/update/${_id}`, data, {
      headers: this.myHeaders,
    });
  }

  softDeleteProduct(_id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURI}/product/delete/${_id}`, {
      headers: this.myHeaders,
    });
  }
}
