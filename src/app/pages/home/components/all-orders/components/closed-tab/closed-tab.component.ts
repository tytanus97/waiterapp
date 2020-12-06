import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';


@Component({
  selector: 'app-closed-tab',
  templateUrl: './closed-tab.component.html',
  styleUrls: ['./closed-tab.component.scss'],
})
export class ClosedTabComponent implements OnInit,OnDestroy {

  public closedOrders: Array<Order>;
  private _closedOrders$;
  constructor(private _ordersService: OrdersService) { }
  
  ngOnInit() {
    console.log('closed init')
    this._closedOrders$ =  this._ordersService.closedOrders.asObservable().subscribe(result => {
      this.closedOrders = result;
    });
  }

  ngOnDestroy(): void {
    console.log('closed destroy');
    this._closedOrders$.unsubscribe();
  }

}
