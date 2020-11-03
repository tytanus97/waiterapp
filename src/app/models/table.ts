export class Table {
  constructor(
    private _tableId: number,
    private _tableDescription: string,
    private _tableNumber: number
  ) {}

  public get tableDescription(): string {
    return this._tableDescription;
  }
  public set tableDescription(value: string) {
    this._tableDescription = value;
  }
  public get tableId(): number {
    return this._tableId;
  }
  public set tableId(value: number) {
    this._tableId = value;
  }
  public get tableNumber(): number {
    return this._tableNumber;
  }
  public set tableNumber(value: number) {
    this._tableNumber = value;
  }
}
