import { Component, inject, OnInit } from '@angular/core';
import { Orderservice } from '../../../core/services/orderservice';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersearchPipe } from '../../../core/pipes/ordersearch-pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ordersdashboard',
  imports: [DatePipe, NgClass, FormsModule, OrdersearchPipe],
  templateUrl: './ordersdashboard.html',
  styleUrl: './ordersdashboard.css',
})
export class Ordersdashboard implements OnInit {
  private readonly _Orderservice = inject(Orderservice);
  private readonly _ToastrService = inject(ToastrService);

  ordersData: any[] = [];
  allOrders: any[] = [];
  searchValue = '';

  ngOnInit(): void {
    this._Orderservice.getAllAdminOrders().subscribe({
      next: (res) => {
        this.ordersData = res.orders;
        this.allOrders = res.orders;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadOrdersAgain() {
    this._Orderservice.getAllAdminOrders().subscribe({
      next: (res) => {
        this.ordersData = [...res.orders];
      },
    });
  }

  orderPreparing(trackingNumber: string): void {
    this._Orderservice.orderPreparing(trackingNumber).subscribe({
      next: (res) => {
        this.loadOrdersAgain();
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  orderShipped(trackingNumber: string): void {
    this._Orderservice.orderShipped(trackingNumber).subscribe({
      next: (res) => {
        this.loadOrdersAgain();
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  orderDelivered(trackingNumber: string): void {
    this._Orderservice.orderDelivered(trackingNumber).subscribe({
      next: (res) => {
        this.loadOrdersAgain();
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  adminCancelOrder(trackingNumber: string): void {
    this._Orderservice.adminCancelOrder(trackingNumber).subscribe({
      next: (res) => {
        this.loadOrdersAgain();
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  orderStatus(event: any): void {
    const status = event.target.value.toLowerCase();

    if (status === 'all') {
      this.ordersData = [...this.allOrders];
      return;
    }

    this.ordersData = this.allOrders.filter((order: any) => order.status.toLowerCase() === status);
  }
}
