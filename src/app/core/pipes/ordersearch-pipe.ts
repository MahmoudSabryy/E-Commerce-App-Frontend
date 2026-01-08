import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersearch',
})
export class OrdersearchPipe implements PipeTransform {
  transform(array: any[] | null | undefined, term: string = ''): any[] {
    if (!array) return [];
    if (!term.trim()) return array;

    term = term.toLowerCase();

    return array.filter((item) => item.trackingNumber == term);
  }
}
