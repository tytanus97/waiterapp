export class DishCategory {
  constructor(
    private _dishCategoryId: number,
    private _dishCategoryName: string
  ) {}

  public get dishCategoryName(): string {
    return this._dishCategoryName;
  }
  public set dishCategoryName(value: string) {
    this._dishCategoryName = value;
  }
  public get dishCategoryId(): number {
    return this._dishCategoryId;
  }
  public set dishCategoryId(value: number) {
    this._dishCategoryId = value;
  }
}
