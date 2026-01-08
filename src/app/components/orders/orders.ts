import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Orderservice } from '../../core/services/orderservice';
import { Cartservices } from '../../core/services/cartservices';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [ReactiveFormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Orderservice = inject(Orderservice);
  private readonly _Cartservices = inject(Cartservices);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);

  userCart: any;
  orderForm: FormGroup = this._FormBuilder.group({
    fullName: [null, [Validators.required]],
    phone: [null, [Validators.required]],

    homeAddress: this._FormBuilder.group({
      governorate: [null, Validators.required],
      city: [null, Validators.required],
      addressDetails: [null, Validators.required],
    }),

    workAddress: this._FormBuilder.group({
      governorate: [null],
      city: [null],
      addressDetails: [null],
    }),
    defaultAddress: [null, [Validators.required]],
    paymentMethod: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this._Cartservices.getLoggedUserCart().subscribe({
      next: (res) => {
        this.userCart = res.data;
        console.log(this.userCart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitOrderForm(): void {
    this._Orderservice.createOrder(this.orderForm.value).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);

        if (res.success === true) {
          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 2000);
        }
      },
      error: (err) => {
        this._ToastrService.error(err.error.error);
      },
    });
  }
}
