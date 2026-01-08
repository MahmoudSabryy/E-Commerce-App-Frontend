import { Component, inject } from '@angular/core';
import { Testinomialservice } from '../../../core/services/testinomialservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testinomialdashboard',
  imports: [CommonModule],
  templateUrl: './testinomialdashboard.html',
  styleUrl: './testinomialdashboard.css',
})
export class Testinomialdashboard {
  testimonials: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private svc: Testinomialservice) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.loading = true;
    this.svc.getTest().subscribe({
      next: (res) => {
        this.testimonials = Array.isArray(res.data) ? res.data : [res.data];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load testimonials';
        this.loading = false;
      },
    });
  }

  approve(id: string): void {
    this.svc.updateTest(id, { isApproved: true }).subscribe({
      next: () => this.loadTestimonials(),
      error: (err) => console.error('Approve failed', err),
    });
  }

  delete(id: string): void {
    if (!confirm('Are you sure to delete this testimonial?')) return;
    this.svc.deleteTest(id).subscribe({
      next: () => this.loadTestimonials(),
      error: (err) => console.error('Delete failed', err),
    });
  }
}
