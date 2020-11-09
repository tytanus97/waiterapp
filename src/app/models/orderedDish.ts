import { Dish } from './dish';
import { Order } from './order';

export class OrderedDish {

    constructor(private _orderedDishId: number,private _dish: Dish,private _order: Order,private _orderDishStatus,private _orderedDishAnnotation) {
            
    }
    public get orderDishStatus() {
        return this._orderDishStatus;
    }
    public set orderDishStatus(value) {
        this._orderDishStatus = value;
    }
    public get order(): Order {
        return this._order;
    }
    public set order(value: Order) {
        this._order = value;
    }
    public get dish(): Dish {
        return this._dish;
    }
    public set dish(value: Dish) {
        this._dish = value;
    }
    public get orderedDishId(): number {
        return this._orderedDishId;
    }
    public set orderedDishId(value: number) {
        this._orderedDishId = value;
    }
    public get orderedDishAnnotation() {
        return this._orderedDishAnnotation;
    }
    public set orderedDishAnnotation(value) {
        this._orderedDishAnnotation = value;
    }
}