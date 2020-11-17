import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { ChangeDetectorRef, Component, DoCheck, KeyValueDiffer, KeyValueDiffers, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { OrderedDish } from 'src/app/models/orderedDish';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit,DoCheck {

  public activeOrders: Array<Order>;
  private _today: Date;
  public xd = true;

  constructor(private _ordersService: OrdersService,
     private _route: ActivatedRoute,
      private _alertController: AlertController,
      private _differs: KeyValueDiffers,
      private _changeRef: ChangeDetectorRef) {
    console.log('ActiveTab konstruktor')
    this._today = new Date();

    this._route.data.subscribe(result => {
      console.log('new orders incoming');
      this.activeOrders = result.activeOrders;
    })
  }
  ngDoCheck(): void {
   console.log('zmiany');
  }

  ngOnInit() {
    this.activeOrders = this._ordersService.getAllOrdersByDateAndStatus(this._today, 'active');
  }

  public async changeStatus(orderedDish: OrderedDish, order: Order) {
    const alert = await this._alertController.create({
      message: 'Oznaczyć jako oznaczone?',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel',
          cssClass: "secondary"
        },
        {
          text: 'OK',
          handler: () => {
            orderedDish.orderDishStatus = 'delivered';
            this.xd = !this.xd;
            this._changeRef.detectChanges();
            this._checkIfAllDelivered(order);   
          }
        }
      ]
    })
    await alert.present();
  }

  private _checkIfAllDelivered(order: Order) {
    const result = order.orderedDishes.filter(o => o.orderDishStatus !== 'delivered').length;
    if (!result) {
      order.orderStatus = 'finished';
      console.log('zmieniam status ordera')
      this.activeOrders = this._ordersService.getAllOrdersByDateAndStatus(this._today, 'active');
    }

    this._changeRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log('zmiany!');
    }

    public trackOrderStatus(index,item) {
      return item.orderStatus;
    }

    public trackOrderedDishStatus(index,item:OrderedDish) {
      return item.orderDishStatus;
    }
}



