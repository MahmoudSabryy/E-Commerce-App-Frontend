import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from '../../core/environment/environment';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from '../../core/pipes/termtext-pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search-pipe';
import { Cartservices } from '../../core/services/cartservices';
import { ToastrService } from 'ngx-toastr';
import { Categoryservices } from '../../core/services/categoryservices';
import { CommonModule } from '@angular/common';
import { Productservice } from '../../core/services/productservice';
import { Testinomialservice } from '../../core/services/testinomialservice';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    TermtextPipe,
    FormsModule,
    SearchPipe,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly _Productservice = inject(Productservice);

  private readonly _Categories = inject(Categoryservices);

  private readonly _Cartservices = inject(Cartservices);

  private readonly _ToastrService = inject(ToastrService);
  private readonly _Testinomialservice = inject(Testinomialservice);

  baseURI = environment.baseURI;

  productsList: IProduct[] = [];

  categoryList: ICategory[] = [];

  searchValue: string = '';
  testData: any;

  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };
  ngOnInit(): void {
    this.getTestimony();
    this.testimonyForm;

    this._Categories.getAllRealCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._Productservice.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data.results;
      },
      error: (err) => {
        console.log(err.message);
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

        this._ToastrService.error(err.error.error);
      },
    });
  }

  testimonyForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
  });

  submitTestimony() {
    if (this.testimonyForm.invalid) return;

    this._Testinomialservice.createTest(this.testimonyForm.value).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.testimonyForm.reset();
      },
      error: (err) => this._ToastrService.error(err.error.message),
    });
  }

  getTestimony() {
    this._Testinomialservice.getTest().subscribe({
      next: (res) => {
        console.log(res.data);
        this.testData = res.data;
      },
      error: (err) => this._ToastrService.error(err.error.message),
    });
  }
}
