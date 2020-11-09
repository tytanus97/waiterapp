import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(value: Array<Dish>, dishCategory: string): Array<Dish> {
    if(!value || !dishCategory || dishCategory === 'wszystkie') return value;
    return value.filter(d => d.dishCategory === dishCategory);
  }

}
