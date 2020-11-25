import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { OrderedDish } from 'src/app/models/orderedDish';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ChooseDishComponent } from '../../../add-order/components/choose-dish/choose-dish.component';

@Component({
  selector: 'app-finished-tab',
  templateUrl: './finished-tab.component.html',
  styleUrls: ['./finished-tab.component.scss'],
})
export class FinishedTabComponent implements OnInit {

  public finishedOrders: Array<Order>;

  constructor(private _route: ActivatedRoute,
              private _modalCtrl: ModalController,
              private _ordersService: OrdersService) { }

  ngOnInit() {
    this._route.data.subscribe(result => {
      this.finishedOrders = result.finishedOrders;
      console.log(this.finishedOrders);
    })
  }


  public async addToOrder(order: Order) {
    const modal = await this._modalCtrl.create({component:ChooseDishComponent});

    await modal.present();
    await modal.onDidDismiss().then(result => {
        if(result.data) {
          const orderedDish = new OrderedDish(
            this._ordersService.getRandomId()
            ,result.data.dish,
            'inProgress');
            order.orderedDishes.push(orderedDish);
            order.orderStatus = 'active';
        }
    });
  }
}
