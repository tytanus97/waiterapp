export class Waiter {
  constructor(
    private _waiterId: number,
    private _waiterFirstName: string,
    private _waiterLastName: string
  ) {}

  public get waiterLastName(): string {
    return this._waiterLastName;
  }
  public set waiterLastName(value: string) {
    this._waiterLastName = value;
  }
  public get waiterFirstName(): string {
    return this._waiterFirstName;
  }
  public set waiterFirstName(value: string) {
    this._waiterFirstName = value;
  }
  public get waiterId(): number {
    return this._waiterId;
  }
  public set waiterId(value: number) {
    this._waiterId = value;
  }
}
