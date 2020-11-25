import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-finished-tab',
  templateUrl: './finished-tab.component.html',
  styleUrls: ['./finished-tab.component.scss'],
})
export class FinishedTabComponent implements OnInit {

  public finishedOrders: Array<Order>;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.data.subscribe(result => {
      this.finishedOrders = result.finishedOrders;
      console.log(this.finishedOrders);
    })
  }


  public addToOrder(order:Order) {
    
  }
}
