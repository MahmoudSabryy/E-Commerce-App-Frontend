import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe',
})
export class CategoryPipePipe implements PipeTransform {
  transform(array: any[] | null | undefined, term: string = ''): any[] {
    if (!array) return [];
    if (!term.trim()) return array;

    return array.filter((item) => item.name.toLowerCase() === term.toLowerCase());
  }
}
