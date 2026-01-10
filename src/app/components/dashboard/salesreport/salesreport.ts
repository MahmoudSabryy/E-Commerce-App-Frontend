import { Component, inject } from '@angular/core';
import { Salesreportservice } from '../../../core/services/salesreportservice';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-salesreport',
  imports: [DecimalPipe, CommonModule],
  templateUrl: './salesreport.html',
  styleUrl: './salesreport.css',
})
export class Salesreport {
  loading = false;
  reportData: any = null;

  totalRevenue = 0;
  totalQty = 0;
  totalPurchases = 0;

  private readonly _Salesreportservice = inject(Salesreportservice);

  ngOnInit(): void {
    this.getReport('2025-01-01', '2026-01-01');
  }

  getReport(start: string, end: string): void {
    this.loading = true;

    this._Salesreportservice.getSalesReport(start, end).subscribe({
      next: (res) => {
        console.log('SALES REPORT RESPONSE:', res);

        this.reportData = res.data ?? null;

        const stats = res.data?.overallStats?.[0];

        if (stats) {
          this.animateCounter('totalRevenue', stats.totalRevenue ?? 0);
          this.animateCounter('totalQty', stats.totalQuantity ?? 0);
          this.animateCounter('totalPurchases', stats.totalOrders ?? 0);
        } else {
          // fallback آمن
          this.totalRevenue = 0;
          this.totalQty = 0;
          this.totalPurchases = 0;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  animateCounter(prop: 'totalRevenue' | 'totalQty' | 'totalPurchases', finalValue: number): void {
    let start = 0;
    const duration = 1500;
    const step = finalValue / (duration / 16);

    const interval = setInterval(() => {
      start += step;
      if (start >= finalValue) {
        start = finalValue;
        clearInterval(interval);
      }
      (this as any)[prop] = Math.floor(start);
    }, 16);
  }
}
