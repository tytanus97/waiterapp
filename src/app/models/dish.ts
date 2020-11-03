import { DishCategory } from "./dishCategory";

export class Dish {
  constructor(
    private _dishId: number,
    private _dishName: string,
    private _dishPrice: number,
    private _dishDescription: string,
    private _dishCategor: DishCategory
  ) {}

  public get dishCategor(): DishCategory {
    return this._dishCategor;
}
public set dishCategor(value: DishCategory) {
    this._dishCategor = value;
}
public get dishDescription(): string {
    return this._dishDescription;
}
public set dishDescription(value: string) {
    this._dishDescription = value;
}
public get dishPrice(): number {
    return this._dishPrice;
}
public set dishPrice(value: number) {
    this._dishPrice = value;
}
public get dishName(): string {
    return this._dishName;
}
public set dishName(value: string) {
    this._dishName = value;
}
public get dishId(): number {
    return this._dishId;
}
public set dishId(value: number) {
    this._dishId = value;
}

}
