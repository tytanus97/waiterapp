import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(value: Array<{key:string,value:Dish}>, dishCategory: string): Array<{key:string,value:Dish}> {
    if(!value || !dishCategory || dishCategory === 'wszystkie') return value;
    return value.filter((kv) => kv.key === dishCategory);
  }
}
