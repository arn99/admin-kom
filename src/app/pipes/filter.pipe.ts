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
    console.log(items);
    console.log(searchText);
    if (typeof searchText === 'string') {
      console.log(searchText);
      // this is a string
      searchText = searchText.toLocaleLowerCase();
    } else {
      console.log(searchText);
      searchText = searchText['name'];
      searchText = searchText.toLocaleLowerCase();
    }

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }
}
