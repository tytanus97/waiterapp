import { Dish } from './dish';
import { OrderedDish } from './orderedDish';

import { Waiter } from "./waiter";

export class Order {
   
  constructor(
    private _orderId:string,
    private _waiter?: Waiter,
    private _table?: number,
    private _orderDate?: Date,
    private _totalPrice?: number,
    private _orderStatus?: string,
    private _orderedDishes?: Array<OrderedDish>,
    private _orderAnnotation?: string
  ) {}

  public get orderStatus(): string {
    return this._orderStatus;
  }
  public set orderStatus(value: string) {
    this._orderStatus = value;
  }
  public get totalPrice(): number {
    return this._totalPrice;
  }
  public set totalPrice(value: number) {
    this._totalPrice = value;
  }
  public get orderDate(): Date {
    return this._orderDate;
  }
  public set orderDate(value: Date) {
    this._orderDate = value;
  }
  public get table(): number {
    return this._table;
  }
  public set table(value: number) {
    this._table = value;
  }
  public get waiter(): Waiter {
    return this._waiter;
  }
  public set waiter(value: Waiter) {
    this._waiter = value;
  }
  public get orderId(): string {
    return this._orderId;
  }
  public set orderId(value: string) {
    this._orderId = value;
  }
  public get orderedDishes(): Array<OrderedDish> {
    return this._orderedDishes;
  }
  public set orderedDishes(value: Array<OrderedDish>) {
    this._orderedDishes = value;
  }
  public get orderAnnotation(): string {
    return this._orderAnnotation;
  }
  public set orderAnnotation(value: string) {
    this._orderAnnotation = value;
  }
}
