export class OrderedDishStatus {
  constructor(
    private _orderedDishStatusId: number,
    private _orderedDishStatusName: string
  ) {}

  public get orderedDishStatusName(): string {
    return this._orderedDishStatusName;
  }
  public set orderedDishStatusName(value: string) {
    this._orderedDishStatusName = value;
  }
  public get orderedDishStatusId(): number {
    return this._orderedDishStatusId;
  }
  public set orderedDishStatusId(value: number) {
    this._orderedDishStatusId = value;
  }
}
