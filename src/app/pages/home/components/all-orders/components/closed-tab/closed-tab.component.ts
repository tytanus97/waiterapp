import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ChooseDishComponent } from '../../../add-order/components/choose-dish/choose-dish.component';

@Component({
  selector: 'app-closed-tab',
  templateUrl: './closed-tab.component.html',
  styleUrls: ['./closed-tab.component.scss'],
})
export class ClosedTabComponent implements OnInit,OnDestroy {

  public closedOrders: Array<Order>;

  constructor(private _ordersService: OrdersService) { }
  
  ngOnInit() {
    this._ordersService.closedOrders.subscribe(result => {
      this.closedOrders = result;
    });
  }

  ngOnDestroy(): void {
     this._ordersService.closedOrders.unsubscribe();
  }

}
