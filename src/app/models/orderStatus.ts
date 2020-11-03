export class OrderStatus {
  constructor(
    private _orderStatusId: number,
    private _orderStatusName: string
  ) {}

  public get orderStatusId(): number {
    return this._orderStatusId;
  }
  public set orderStatusId(value: number) {
    this._orderStatusId = value;
  }

  public get orderStatusName(): string {
    return this._orderStatusName;
  }
  public set orderStatusName(value: string) {
    this._orderStatusName = value;
  }
}
