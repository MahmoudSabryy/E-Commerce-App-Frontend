import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../core/environment/environment';
import { Categoryservices } from '../../../core/services/categoryservices';
import { SearchPipe } from '../../../core/pipes/search-pipe';
import { Productservice } from '../../../core/services/productservice';
import { IProduct } from '../../../core/interfaces/iproduct';

@Component({
  selector: 'app-productsdashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SearchPipe, CommonModule],
  templateUrl: './productsdashboard.html',
  styleUrls: ['./productsdashboard.css'],
})
export class Productsdashboard implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Productservice = inject(Productservice);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Categoryservices = inject(Categoryservices);

  baseURi = environment.baseURI;
  productsList: IProduct[] = [];
  subCategoriesData: any[] = [];
  uniqueCategories: string[] = [];

  addProductForm: FormGroup;
  searchValue = '';
  selectedFiles: File[] = [];
  filteredSubCategories: any[] = [];
  selectedProductId: string | null = null;

  constructor() {
    this.addProductForm = this._FormBuilder.group({
      productName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      productDesc: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price: [null, [Validators.required]],
      discountPrice: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      images: [null, [Validators.required]],
      category: [null, [Validators.required]],
      subCategory: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this._Productservice.adminGetAllProducts().subscribe({
      next: (res: any) => (this.productsList = res.data),
      error: (err) => console.log(err),
    });
  }

  loadCategories() {
    this._Categoryservices.getAllSubCategories().subscribe({
      next: (res: any) => {
        this.subCategoriesData = res.data;
        console.log(this.subCategoriesData);

        this.uniqueCategories = [
          ...new Set(this.subCategoriesData.map((item) => item.category.name)),
        ];
      },
      error: (err) => console.log(err),
    });
  }

  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    this.filteredSubCategories = this.subCategoriesData.filter(
      (item) => item.category.name === selectedCategory
    );
    this.addProductForm.patchValue({ subCategory: '' });
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  submitAddProduct() {
    const formData = new FormData();
    Object.keys(this.addProductForm.controls).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, this.addProductForm.get(key)?.value);
      }
    });
    this.selectedFiles.forEach((file) => formData.append('images', file));

    this._Productservice.addProduct(formData).subscribe({
      next: (res: any) => {
        this._ToastrService.success(res?.message || 'Product added successfully');
        this.loadProducts();
        this.addProductForm.reset();
        this.selectedFiles = [];
      },
      error: (err) => console.log(err),
    });
  }

  editProduct(product: any) {
    this.selectedProductId = product._id;
    this.addProductForm.patchValue({
      productName: product.productName,
      productDesc: product.productDesc,
      price: product.price,
      discountPrice: product.discountPrice,
      stock: product.stock,
      category: product.category.name,
      subCategory: product.subCategory?.name,
    });
    this.onCategoryChange({ target: { value: product.category.name } });
  }

  submitEditProduct(id: string | null) {
    if (!id) return;

    const formData = new FormData();
    Object.keys(this.addProductForm.controls).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, this.addProductForm.get(key)?.value);
      }
    });
    this.selectedFiles.forEach((file) => formData.append('images', file));

    this._Productservice.updateProduct(id, formData).subscribe({
      next: (res: any) => {
        this._ToastrService.success(res?.message || 'Product updated successfully');
        this.loadProducts();
        this.addProductForm.reset();
        this.selectedFiles = [];
        this.selectedProductId = null;
      },
      error: (err) => console.log(err),
    });
  }

  softDeleteProduct(id: string) {
    this._Productservice.softDeleteProduct(id).subscribe({
      next: (res: any) => {
        this._ToastrService.success(res?.message || 'Product deleted');
        this.loadProducts();
      },
      error: (err) => this._ToastrService.error(err?.message || 'Error'),
    });
  }
}
