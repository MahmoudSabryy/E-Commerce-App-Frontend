import { Component, inject } from '@angular/core';
import { SearchPipe } from '../../core/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { environment } from '../../core/environment/environment';
import { TermtextPipe } from '../../core/pipes/termtext-pipe';
import { Cartservices } from '../../core/services/cartservices';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Productservice } from '../../core/services/productservice';

@Component({
  selector: 'app-product',
  imports: [SearchPipe, TermtextPipe, FormsModule, CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  searchValue: string = '';

  baseURi = environment.baseURI;
  productsList: any;
  private readonly _Productservice = inject(Productservice);
  private readonly _Cartservices = inject(Cartservices);
  private readonly _ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this._Productservice.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data.results;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(_id: string): void {
    this._Cartservices.AddProductToCart(_id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
