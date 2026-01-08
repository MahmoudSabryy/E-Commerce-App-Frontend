import { Component, inject } from '@angular/core';
import { Categoryservices } from '../../../core/services/categoryservices';
import { Subcategoryservices } from '../../../core/services/subcategoryservices';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../../core/interfaces/icategory';
import { ISubcategory } from '../../../core/interfaces/isubcategory';

@Component({
  selector: 'app-subcategorydashboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './subcategorydashboard.html',
  styleUrl: './subcategorydashboard.css',
})
export class Subcategorydashboard {
  private readonly _Categoryservices = inject(Categoryservices);
  private readonly _Subcategoryservices = inject(Subcategoryservices);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);

  categories: ICategory[] = [];
  subs: ISubcategory[] = [];
  filtered: ISubcategory[] = [];

  searchValue = '';
  filterActive: 'all' | 'active' | 'inactive' = 'all';
  filterCategory = '';

  addForm!: FormGroup;
  editForm!: FormGroup;

  selectedId: string | null = null;

  ngOnInit(): void {
    this.initForms();
    this.loadCategories();
    this.loadSubCategories();
  }

  initForms() {
    this.addForm = this._FormBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      isActive: [true, Validators.required],
    });

    this.editForm = this._FormBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  loadCategories() {
    this._Categoryservices.getAllRealCategories().subscribe({
      next: (res) => (this.categories = res.data),
      error: console.error,
    });
  }

  loadSubCategories() {
    this._Subcategoryservices.getAllSubCategories().subscribe({
      next: (res: any) => {
        this.subs = res.data;
        this.filtered = [...this.subs];
        this.applyFilters();
      },
      error: console.error,
    });
  }

  applyFilters() {
    let data = [...this.subs];

    if (this.searchValue) {
      data = data.filter((s) => s.name.toLowerCase().includes(this.searchValue.toLowerCase()));
    }

    if (this.filterActive === 'active') {
      data = data.filter((s) => s.isActive === true);
    }
    if (this.filterActive === 'inactive') {
      data = data.filter((s) => s.isActive === false);
    }

    this.filtered = data;

    console.log(this.filtered);
  }

  setActiveFilter(type: 'all' | 'active' | 'inactive') {
    this.filterActive = type;
    this.applyFilters();
  }

  submitAdd() {
    if (this.addForm.invalid) return;

    this._Subcategoryservices.addSubcategory(this.addForm.value).subscribe({
      next: (res: any) => {
        this._ToastrService.success('Sub Category Added Successfully');
        this.addForm.reset({ isActive: true });
        this.loadSubCategories();
      },
      error: (err) => this._ToastrService.error(err.error.error || 'Error'),
    });
  }

  openEdit(sub: any) {
    this.selectedId = sub._id;

    this.editForm.patchValue({
      name: sub.name,
      category: sub.category?._id,
      isActive: sub.isActive,
    });
  }

  submitEdit() {
    if (!this.selectedId || this.editForm.invalid) return;

    this._Subcategoryservices
      .updateSubCategoryById(this.selectedId, this.editForm.value)
      .subscribe({
        next: () => {
          this._ToastrService.success('Updated Successfully');
          this.selectedId = null;
          this.loadSubCategories();
        },
        error: (err) => this._ToastrService.error(err.error.error || 'Error'),
      });
  }

  delete(id: string) {
    if (!confirm('Delete this SubCategory?')) return;

    this._Subcategoryservices.removeSubCategoryById(id).subscribe({
      next: () => {
        this._ToastrService.success('Deleted Successfully');
        this.loadSubCategories();
      },
      error: (err) => this._ToastrService.error(err.error.error || 'Error'),
    });
  }
}
