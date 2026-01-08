import { Component, inject, OnInit } from '@angular/core';
import { Orderservice } from '../../core/services/orderservice';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { environment } from '../../core/environment/environment';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, NgClass, CommonModule],
  templateUrl: './allorders.html',
  styleUrl: './allorders.css',
})
export class Allorders implements OnInit {
  private readonly _Orderservice = inject(Orderservice);

  baseURI = environment.baseURI;
  ordersData: any;

  ngOnInit(): void {
    this._Orderservice.getAllUserOrders().subscribe({
      next: (res) => {
        this.ordersData = res;

        console.log(res);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  cancelOrder(trackingNumber: string): void {
    this._Orderservice.cancelOrder(trackingNumber).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
