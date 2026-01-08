import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Cartservices {
  private readonly _HttpClient = inject(HttpClient);

  myHeaders: any = { authorization: localStorage.getItem('userToken') };

  AddProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURI}/cart/add`,
      {
        productId: id,
      },
      {
        headers: this.myHeaders,
      }
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/cart`, {
      headers: this.myHeaders,
    });
  }

  removeProductFromCart(_id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURI}/cart/${_id}`, {
      headers: this.myHeaders,
    });
  }

  increaseProductQuanInCart(_id: string): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseURI}/cart/increasequantity/${_id}`,
      {},
      {
        headers: this.myHeaders,
      }
    );
  }
  decreaseProductQuanInCart(_id: string): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseURI}/cart/decreasequantity/${_id}`,
      {},
      {
        headers: this.myHeaders,
      }
    );
  }
}
