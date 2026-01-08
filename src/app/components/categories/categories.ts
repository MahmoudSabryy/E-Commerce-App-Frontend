import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Categoryservices } from '../../core/services/categoryservices';
import { CommonModule } from '@angular/common';
import { environment } from '../../core/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Productservice } from '../../core/services/productservice';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private readonly _Categoryservices = inject(Categoryservices);
  private readonly _Productservice = inject(Productservice);
  private readonly _ToastrService = inject(ToastrService);

  categoryData: any;

  productsData: any;

  baseURI = environment.baseURI;

  isShowBackToTop: boolean = false;
  private backToTopThreshold = 400; // المسافة اللي بعدها الزرار يظهر

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.isShowBackToTop = scrollPosition > this.backToTopThreshold;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  scrollToSection(id: string) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }

  ngOnInit(): void {
    this._Categoryservices.getAllRealCategories().subscribe({
      next: (res) => {
        this.categoryData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllProductsByCaterory(_id: string): void {
    this._Categoryservices.getAllProductsByCaterory(_id).subscribe({
      next: (res) => {
        this.productsData = res.data;
        setTimeout(() => {
          const section = document.querySelector('.products-section');
          section?.classList.add('show');
          this.scrollToSection('all');

          const cards = document.querySelectorAll('.product-card');
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('show'), 120 * i);
          });
        }, 50);
      },
      error: (err) => {
        this._ToastrService.error(err.error.error);
      },
    });
  }
}
