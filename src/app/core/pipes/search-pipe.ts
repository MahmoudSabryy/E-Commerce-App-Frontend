import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(array: any[] | null | undefined, term: string = ''): any[] {
    if (!array) return [];
    if (!term.trim()) return array;

    term = term.toLowerCase();

    return array.filter((item) => item.productName?.toLowerCase().includes(term));
  }
}
