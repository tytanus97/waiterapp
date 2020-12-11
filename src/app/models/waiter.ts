export class Waiter {
 
 
  constructor(
    private _waiterId: number,
    private _waiterFirstName: string,
    private _waiterLastName: string,
    private _waiterEmail: string,
    private _waiterPassword: string
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
  public get waiterEmail(): string {
    return this._waiterEmail;
  }
  public set waiterEmail(value: string) {
    this._waiterEmail = value;
  } 
  public get waiterPassword(): string {
    return this._waiterPassword;
  }
  public set waiterPassword(value: string) {
    this._waiterPassword = value;
  }
}
