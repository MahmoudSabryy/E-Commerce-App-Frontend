import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SearchPipe } from '../../core/pipes/search-pipe';
import { TermtextPipe } from '../../core/pipes/termtext-pipe';
import { Cartservices } from '../../core/services/cartservices';
import { Productservice } from '../../core/services/productservice';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../core/environment/environment';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SearchPipe, TermtextPipe, FormsModule, CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  searchValue: string = '';

  baseURi = environment.baseURI;

  productsList: any[] = [];

  // 🔥 Pagination
  currentPage: number = 1;
  totalPages: number = 0;
  limit: number = 8;

  private readonly _Productservice = inject(Productservice);
  private readonly _Cartservices = inject(Cartservices);
  private readonly _ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this.getProducts();
  }

  // ✅ Get Products with Pagination
  getProducts(page: number = 1): void {
    this.currentPage = page;

    this._Productservice.getAllProducts(page, this.limit).subscribe({
      next: (res) => {
        this.productsList = res.data.results;
        this.totalPages = res.data.totalPages;
      },
      error: (err) => console.log(err),
    });
  }

  // ⬅ Previous
  prevPage(): void {
    if (this.currentPage > 1) {
      this.getProducts(this.currentPage - 1);
    }
  }

  // ➡ Next
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.getProducts(this.currentPage + 1);
    }
  }

  // 🔢 Go to Page
  changePage(page: number): void {
    this.getProducts(page);
  }

  // 🔢 Pages Array
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // 🛒 Add To Cart
  addToCart(_id: string): void {
    this._Cartservices.AddProductToCart(_id).subscribe({
      next: (res) => this._ToastrService.success(res.message),
      error: (err) => console.log(err),
    });
  }
}
