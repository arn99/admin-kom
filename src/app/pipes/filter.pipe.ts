import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'foodFilter' })
export class FoodFilterPipe implements PipeTransform {
  /*  Transform
   @param {any[]} items
   @param {string} searchText
   @returns {any[]}
   */
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    if (typeof searchText === 'string') {
      searchText = searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase() ;
      console.log(searchText);
      return items.filter(it => {
        if (it.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(searchText)) {
          return it.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(searchText);
        } else {
          return it.category.toLocaleLowerCase().includes(searchText);
        }
      });
    }
  }
}
