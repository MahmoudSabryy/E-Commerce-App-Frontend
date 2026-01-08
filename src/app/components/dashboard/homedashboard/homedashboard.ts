import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Userservices } from '../../../core/services/userservices';
import { Orderservice } from '../../../core/services/orderservice';

@Component({
  selector: 'app-homedashboard',
  imports: [CommonModule, RouterLink, RouterLinkActive, DecimalPipe],
  templateUrl: './homedashboard.html',
  styleUrl: './homedashboard.css',
})
export class Homedashboard {
  userData: any;
  orderData: any;
  ordersTotalSales: any;
  ordersTotalPending: any;
  ordersTotalSalesPending: any;
  ordersTotalPreparing: any;
  ordersTotalSalesPreparing: any;
  ordersTotalShipped: any;
  ordersTotalSalesShipped: any;
  ordersTotalDelivered: any;
  ordersTotalSalesDelivered: any;
  ordersTotalCancelled: any;
  ordersTotalSalesCancelled: any;
  private readonly _Userservices = inject(Userservices);
  private readonly _Orderservice = inject(Orderservice);

  ngOnInit(): void {
    this._Userservices.getUserData().subscribe({
      next: (res) => {
        this.userData = res.data;
      },

      error: (err) => {
        console.log(err);
      },
    });

    this._Orderservice.getAllAdminOrders().subscribe({
      next: (res) => {
        this.orderData = res.orders;
        this.ordersTotalSales = this.orderData.reduce((accumulator: any, currentValue: any) => {
          return accumulator + currentValue.totalPrice;
        }, 0);

        this.ordersTotalPending = this.orderData.filter((order: any) => order.status === 'pending');
        this.ordersTotalSalesPending = this.ordersTotalPending.reduce(
          (accumulator: any, currentValue: any) => {
            return accumulator + currentValue.totalPrice;
          },
          0
        );
        this.ordersTotalShipped = this.orderData.filter((order: any) => order.status === 'shipped');
        this.ordersTotalSalesShipped = this.ordersTotalShipped.reduce(
          (accumulator: any, currentValue: any) => {
            return accumulator + currentValue.totalPrice;
          },
          0
        );

        this.ordersTotalPreparing = this.orderData.filter(
          (order: any) => order.status === 'preparing'
        );
        this.ordersTotalSalesPreparing = this.ordersTotalPreparing.reduce(
          (accumulator: any, currentValue: any) => {
            return accumulator + currentValue.totalPrice;
          },
          0
        );
        this.ordersTotalDelivered = this.orderData.filter(
          (order: any) => order.status === 'delivered'
        );
        this.ordersTotalSalesDelivered = this.ordersTotalDelivered.reduce(
          (accumulator: any, currentValue: any) => {
            return accumulator + currentValue.totalPrice;
          },
          0
        );

        this.ordersTotalCancelled = this.orderData.filter(
          (order: any) => order.status === 'cancelled'
        );
        this.ordersTotalSalesCancelled = this.ordersTotalCancelled.reduce(
          (accumulator: any, currentValue: any) => {
            return accumulator + currentValue.totalPrice;
          },
          0
        );

        console.log(this.ordersTotalSalesPreparing);
        console.log(this.ordersTotalSalesCancelled);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
