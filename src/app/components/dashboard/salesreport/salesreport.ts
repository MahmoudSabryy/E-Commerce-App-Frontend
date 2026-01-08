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

  ngOnInit() {
    this.getReport('2025-01-01', '2026-01-01');
  }

  getReport(start: string, end: string) {
    this.loading = true;

    this._Salesreportservice.getSalesReport(start, end).subscribe({
      next: (res) => {
        this.reportData = res.data;

        const stats = this.reportData.overallStats[0];

        this.animateCounter('totalRevenue', stats.totalRevenue);
        this.animateCounter('totalQty', stats.totalQuantity);
        this.animateCounter('totalPurchases', stats.totalOrders);

        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  animateCounter(prop: string, finalValue: number) {
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
