import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { environment } from '../../core/environment/environment';
import { Cartservices } from '../../core/services/cartservices';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Productservice } from '../../core/services/productservice';

@Component({
  selector: 'app-details',
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  private readonly _Productservice = inject(Productservice);

  private readonly _Cartservices = inject(Cartservices);

  private readonly _ToastrService = inject(ToastrService);

  productDetails: any;

  baseURI = environment.baseURI;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 2000,
    navText: ['‹', '›'],
    items: 1,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let productId = p.get('_id');
        let slugedProduct = p.get('slug');

        if (productId) {
          this._Productservice.getSpecificProductsById(productId).subscribe({
            next: (res) => {
              this.productDetails = res.data;
              console.log(this.productDetails);
            },
            error: (err) => {
              console.log(err);
            },
          });
          return;
        }

        if (slugedProduct) {
          this._Productservice.getSpecificProductsBySlug(slugedProduct).subscribe({
            next: (res) => {
              console.log(res.data);

              this.productDetails = res.data;
              console.log(this.productDetails);
            },
            error: (err) => {
              console.log(err);
            },
          });
          return;
        }
      },
    });
  }

  addToCart(_id: string): void {
    this._Cartservices.AddProductToCart(_id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
    });
  }
}
