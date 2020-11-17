import { Pipe, PipeTransform } from '@angular/core';
import { OrderedDish } from 'src/app/models/orderedDish';

@Pipe({
  name: 'quantityByStatus'
})
export class QuantityByStatusPipe implements PipeTransform {

  transform(value: Array<OrderedDish>, status: string): number {
    console.log('quantityByStatus');
    return value.reduce((acc,curr) => (curr.orderDishStatus === status ? acc+1:acc),0);
  }

}
