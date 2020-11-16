import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit {

  public activeOrders: Array<Order>;
  private _today: Date;

  constructor(private _ordersService: OrdersService,private _route: ActivatedRoute) {
    console.log('ActiveTab konstruktor')
    this._today = new Date();

    this._route.data.subscribe(result => {
      this.activeOrders = result.activeOrders
    })
   }

  ngOnInit() {
    this.activeOrders = this._ordersService.getAllOrdersByDateAndStatus(this._today,'active');
   
  }
}
