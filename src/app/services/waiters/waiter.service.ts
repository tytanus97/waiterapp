import { Injectable } from '@angular/core';
import { Waiter } from 'src/app/models/waiter';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  private _waiter: Waiter;

  constructor() { 
    this._waiter = new Waiter(1,"Pawel","Ataman");
  }

  public getLoggedWaiter() {
    return this._waiter;
  }
}
