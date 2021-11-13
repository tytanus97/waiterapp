import { OnDestroy, ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { OrderedDish } from 'src/app/models/orderedDish';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ChooseDishComponent } from '../../../add-order/components/choose-dish/choose-dish.component';

@Component({
  selector: 'app-finished-tab',
  templateUrl: './finished-tab.component.html',
  styleUrls: ['./finished-tab.component.scss'],
})
export class FinishedTabComponent implements OnInit,OnDestroy {

  public finishedOrders: Array<Order>;
  private _finishedOrders$;

  constructor(
    private _route: ActivatedRoute,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _ordersService: OrdersService,
  ) { }
 
  ngOnInit() {
   
    this._finishedOrders$ = this._ordersService.finishedOrders.asObservable().subscribe(result => {
      this.finishedOrders = result;
    });
  }


  public async addToOrder(order: Order) {
    const modal = await this._modalCtrl.create({ component: ChooseDishComponent });

    await modal.present();
    await modal.onDidDismiss().then(result => {
      if (result.data) {
        const orderedDish = new OrderedDish(
          this._ordersService.getRandomId()
          , result.data.dish,
          'inProgress');
        order.orderedDishes.push(orderedDish);
        order.orderStatus = 'active';
        setTimeout(() => {
          this._ordersService.fetchAll();
        }, 1000)
      }
    });
  }

  public async finalizeOrder(order: Order) {
    const alert = await this._alertCtrl.create({
      header: 'Sfinalizować zamówienie?',
      message: `Do zapłaty ${order.totalPrice} zł`,
      buttons: [
        {
          text: 'Nie',
          role: 'cancel'
        }, {
          text: 'Tak',
          handler: () => {
            order.orderStatus = 'closed';
            setTimeout(() => {
             this._ordersService.fetchAll();
            }, 1000)

          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy(): void {
    this._finishedOrders$.unsubscribe();
  }
}
