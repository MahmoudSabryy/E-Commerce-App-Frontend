import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Categoryservices } from '../../../core/services/categoryservices';
import { environment } from '../../../core/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../core/pipes/search-pipe';
import { CategoryPipePipe } from '../../../core/pipes/category-pipe-pipe';
import { ICategory } from '../../../core/interfaces/icategory';

@Component({
  selector: 'app-categorydashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CategoryPipePipe],
  templateUrl: './categorydashboard.html',
  styleUrls: ['./categorydashboard.css'],
})
export class Categorydashboard implements OnInit {
  private readonly _Categoryservices = inject(Categoryservices);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);

  categoryData: ICategory[] = [];
  filteredCategories: ICategory[] = [];
  searchValue = '';

  baseURI = environment.baseURI;

  addCategoryForm!: FormGroup;
  editCategoryForm!: FormGroup;

  selectedFiles: File[] = [];
  editSelectedFiles: File[] = [];

  selectedCategoryId: string | null = null;

  ngOnInit(): void {
    this.loadCategories();
    this.initForms();
  }

  initForms() {
    this.addCategoryForm = this._FormBuilder.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
      isActive: [true],
    });

    this.editCategoryForm = this._FormBuilder.group({
      name: ['', Validators.required],
      image: [null],
      isActive: [true],
    });
  }

  loadCategories() {
    this._Categoryservices.getAllRealCategories().subscribe({
      next: (res) => {
        this.categoryData = res.data;
        this.filteredCategories = [...this.categoryData];
        console.log(this.filteredCategories);
      },
      error: (err) => console.log(err),
    });
  }

  // GET IMAGE FILE
  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onEditFileChange(event: any) {
    this.editSelectedFiles = Array.from(event.target.files);
  }

  // ADD CATEGORY
  submitAddCategory() {
    const formData = new FormData();
    formData.append('name', this.addCategoryForm.get('name')?.value);
    formData.append('isActive', String(this.addCategoryForm.get('isActive')?.value));

    this.selectedFiles.forEach((file) => formData.append('image', file));

    this._Categoryservices.addCategory(formData).subscribe({
      next: (res: any) => {
        this._ToastrService.success('Category added successfully');
        this.loadCategories();
        this.addCategoryForm.reset({ isActive: true });
        this.selectedFiles = [];
      },
      error: (err) => console.log(err),
    });
  }

  // OPEN EDIT
  openEditCategory(cat: any) {
    this.selectedCategoryId = cat._id;

    this.editCategoryForm.patchValue({
      name: cat.name,
      isActive: cat.isActive,
    });

    this.editSelectedFiles = [];
  }

  // SUBMIT EDIT
  submitEditCategory() {
    if (!this.selectedCategoryId) return;

    const formData = new FormData();

    formData.append('name', this.editCategoryForm.get('name')?.value);
    formData.append('isActive', String(this.editCategoryForm.get('isActive')?.value));

    this.editSelectedFiles.forEach((file) => formData.append('image', file));

    this._Categoryservices.updateCategory(this.selectedCategoryId, formData).subscribe({
      next: (res: any) => {
        this._ToastrService.success('Category updated successfully');
        this.loadCategories();
        this.selectedCategoryId = null;
        this.editSelectedFiles = [];
      },
      error: (err) => console.log(err),
    });
  }

  // DELETE
  deleteCategory(id: string) {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this._Categoryservices.deleteCategory(id).subscribe({
      next: () => {
        this._ToastrService.success('Category deleted successfully');
        this.loadCategories();
      },
      error: (err) => console.log(err),
    });
  }

  // FILTERS
  filterActive() {
    this.filteredCategories = this.categoryData.filter((cat) => cat.isActive === true);
  }

  filterDeleted() {
    this.filteredCategories = this.categoryData.filter((cat) => cat.isActive === false);
  }

  showAll() {
    this.filteredCategories = [...this.categoryData];
  }
}
