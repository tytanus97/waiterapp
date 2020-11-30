import { Component, OnInit } from '@angular/core';
import { Waiter } from 'src/app/models/waiter';
import { WaiterService } from 'src/app/services/waiters/waiter.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss'],
})
export class WaiterComponent implements OnInit {

  public loggedWaiter: Waiter;

  constructor(private _waiterService: WaiterService) { }

  ngOnInit() {
    this.loggedWaiter = this._waiterService.getLoggedWaiter();
  }

}
