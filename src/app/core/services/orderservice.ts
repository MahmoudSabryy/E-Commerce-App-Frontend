import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Orderservice {
  private readonly _HttpClient = inject(HttpClient);

  myHeaders: any = { authorization: localStorage.getItem('userToken') };

  createOrder(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURI}/order`, data, { headers: this.myHeaders });
  }

  getAllUserOrders(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/order/user`, { headers: this.myHeaders });
  }

  cancelOrder(trackingNumber: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURI}/order/cancel/${trackingNumber}`, {
      headers: this.myHeaders,
    });
  }

  getAllAdminOrders(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/order`, { headers: this.myHeaders });
  }

  getOrderByTrackingNumber(trackingNumber: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.baseURI}/order/trackingNumber/${trackingNumber}`, {
      headers: this.myHeaders,
    });
  }

  orderPreparing(trackingNumber: string): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseURI}/order/preparing/${trackingNumber}`,
      {},
      { headers: this.myHeaders }
    );
  }

  orderShipped(trackingNumber: string): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseURI}/order/shipped/${trackingNumber}`,
      {},
      { headers: this.myHeaders }
    );
  }

  orderDelivered(trackingNumber: string): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseURI}/order/delivered/${trackingNumber}`,
      {},
      { headers: this.myHeaders }
    );
  }

  adminCancelOrder(trackingNumber: string): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseURI}/order/canceladmin/${trackingNumber}`,
      {},
      { headers: this.myHeaders }
    );
  }
}
