import { Pipe, PipeTransform } from '@angular/core';
import { OrderedDish } from 'src/app/models/orderedDish';

@Pipe({
  name: 'hasAnnotation'
})
export class HasAnnotationPipe implements PipeTransform {

  transform(value: Array<OrderedDish>): unknown {
    return value.filter(od => od.orderedDishAnnotation);
  }

}
