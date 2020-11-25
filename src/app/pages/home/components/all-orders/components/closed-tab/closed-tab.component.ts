import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { ChooseDishComponent } from '../../../add-order/components/choose-dish/choose-dish.component';

@Component({
  selector: 'app-closed-tab',
  templateUrl: './closed-tab.component.html',
  styleUrls: ['./closed-tab.component.scss'],
})
export class ClosedTabComponent implements OnInit {

  public closedOrders: Array<Order>;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {

    this._route.data.subscribe(result => {
      this.closedOrders = result.closedOrders;
    })
  }

 

}
