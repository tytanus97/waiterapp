import { ApplicationRef, ChangeDetectorRef, Component, DoCheck, KeyValueDiffers, OnInit,  } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { OrderedDish } from 'src/app/models/orderedDish';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ChooseDishComponent } from '../../../add-order/components/choose-dish/choose-dish.component';

@Component({
  selector: 'app-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit {

  public activeOrders: Array<Order>;
  private _today: Date;
  public trigger: boolean = false;

  constructor(private _ordersService: OrdersService,
    private _route: ActivatedRoute,
    private _alertController: AlertController,
    private _modalCtrl: ModalController) {
 
    this._today = new Date();

    this._route.data.subscribe(result => {
    
      this.activeOrders = result.activeOrders;
    })
  }
  
  ngOnInit() {
   
  }
  
  public async changeStatus(orderedDish: OrderedDish, order: Order) {
    const alert = await this._alertController.create({
      message: 'Oznaczyć jako dostarczone?',
      buttons: [
        {
          text: 'Anuluj',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this._checkIfAllDelivered(order,orderedDish);
          }
        }
      ]
    })
    await alert.present();
  }

  private _checkIfAllDelivered(order: Order,orderedDish:OrderedDish) {
    orderedDish.orderDishStatus = 'delivered';
    const result = order.orderedDishes.filter(o => o.orderDishStatus !== 'delivered').length;
    if (!result) {
      order.orderStatus = 'finished';
      setTimeout(() => {
        this.activeOrders = this._ordersService.getAllOrdersByDateAndStatus(this._today, 'active');
      }, 1000);

    }
    this.trigger = !this.trigger;
  }

  public async addToOrder(order: Order) {
    const selectDish = this._modalCtrl.create({
      component: ChooseDishComponent,
    });

    (await selectDish).present();
    (await selectDish).onDidDismiss().then((res) => {
      if (res.data) {
        const orderedDish = new OrderedDish(
          this._ordersService.getRandomId(),
          res.data.dish,
          "inProgress",'');
        console.log(orderedDish);
        order.orderedDishes.push(orderedDish);
      }
    });
  }

  public trackOrderStatus(index, item) {
    return item.orderStatus;
  }

  public trackOrderedDishStatus(index, item: OrderedDish) {
    return item.orderDishStatus;
  }
}



