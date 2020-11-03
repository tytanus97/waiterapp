import { Dish } from './dish';
import { OrderedDish } from './orderedDish';
import { OrderStatus } from "./orderStatus";
import { Table } from "./Table";
import { Waiter } from "./waiter";

export class Order {
  
  constructor(
    private _orderId,
    private _waiter: Waiter,
    private _table: Table,
    private _orderDate: Date,
    private _totalPrice: number,
    private _orderStatus: OrderStatus,
    private _orderedDishes: Array<OrderedDish>
  ) {}

  public get orderStatus(): OrderStatus {
    return this._orderStatus;
  }
  public set orderStatus(value: OrderStatus) {
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
  public get table(): Table {
    return this._table;
  }
  public set table(value: Table) {
    this._table = value;
  }
  public get waiter(): Waiter {
    return this._waiter;
  }
  public set waiter(value: Waiter) {
    this._waiter = value;
  }
  public get orderId() {
    return this._orderId;
  }
  public set orderId(value) {
    this._orderId = value;
  }
  public get orderedDishes(): Array<OrderedDish> {
    return this._orderedDishes;
  }
  public set orderedDishes(value: Array<OrderedDish>) {
    this._orderedDishes = value;
  }
}
