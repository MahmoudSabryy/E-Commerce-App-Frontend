import { ICart } from './../../core/interfaces/icart';
import {
  AfterViewChecked,
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Cartservices } from '../../core/services/cartservices';

import { environment } from '../../core/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly _CartServices = inject(Cartservices);
  private readonly _ToastrService = inject(ToastrService);

  baseURI = environment.baseURI;
  cartItem: ICart = {} as ICart;
  ngOnInit(): void {
    this._CartServices.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.success === true) {
          this.cartItem = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProductFromCart(_id: string): void {
    this._CartServices.removeProductFromCart(_id).subscribe({
      next: async (res) => {
        console.log(res);
        this.cartItem = res.data;
        this._ToastrService.error(res.message);
      },
      error: (err) => {
        console.log(err.error.message);

        this._ToastrService.error(JSON.stringify(err.error));
      },
    });
  }

  increaseProductQuanInCart(_id: string): void {
    this._CartServices.increaseProductQuanInCart(_id).subscribe({
      next: (res) => {
        this.cartItem = res.data;
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  decreaseProductQuanInCart(_id: string): void {
    this._CartServices.decreaseProductQuanInCart(_id).subscribe({
      next: (res) => {
        this.cartItem = res.data;
        this._ToastrService.warning(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
