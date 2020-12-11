import { Component, OnInit } from '@angular/core';
import { Waiter } from 'src/app/models/waiter';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { WaiterService } from 'src/app/services/waiters/waiter.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss'],
})
export class WaiterComponent implements OnInit {

  public loggedWaiter: Waiter;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.loggedWaiter = this._authService.getLoggedWaiter();
  }

}
