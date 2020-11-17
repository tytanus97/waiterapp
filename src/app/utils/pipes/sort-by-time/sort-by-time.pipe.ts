import { Pipe, PipeTransform } from '@angular/core';
import { Order } from 'src/app/models/order';

@Pipe({
  name: 'sortByTime'
})
export class SortByTimePipe implements PipeTransform {

  transform(value: Array<Order>): Array<Order> {
    if(!value || value.length === 0) return;
    return value.sort((o1: Order,o2: Order) => {
      return o1.orderDate.getTime() - o2.orderDate.getTime();
    })
  }

}
