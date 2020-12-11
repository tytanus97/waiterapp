import { Injectable } from '@angular/core';
import { Waiter } from 'src/app/models/waiter';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  private _waiters: Array<Waiter>;

  constructor() {
    console.log('waiter service constructor');
    this._waiters = new Array<Waiter>();
    this._waiters.push(new Waiter(1,'Pawel','Ataman','pawel.ataman@email.com','kelner'));
  }

  public findWaiterByEmail(email:string): Waiter {
    const waiter: Waiter = this._waiters.find(w => w.waiterEmail === email);
    return waiter;
  }
}
