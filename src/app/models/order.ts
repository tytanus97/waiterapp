import { Dish } from './dish';
import { OrderedDish } from './orderedDish';

import { Waiter } from "./waiter";

export class Order {
   
  constructor(
    public orderId:string,
    public waiter?: Waiter,
    public table?: number,
    public orderDate?: Date,
    public totalPrice?: number,
    public orderStatus?: string,
    public orderedDishes?: Array<OrderedDish>,
    public orderAnnotation?: string
  ) {}
}
