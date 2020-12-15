import { Dish } from "./dish";

export class OrderedDish {
  constructor(
    public orderedDishId?: number,
    public dish?: Dish,
    public orderDishStatus?
  ) {}
}
