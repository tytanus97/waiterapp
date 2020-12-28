import {Component,OnDestroy,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { OrderedDish } from 'src/app/models/orderedDish';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { AddOrderComponent } from '../../../add-order/add-order.component';
import { ChooseDishComponent } from '../../../add-order/components/choose-dish/choose-dish.component';

@Component({
  selector: 'app-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit,OnDestroy {

  public activeOrders: Array<Order>;
  public trigger: boolean = false;
  private _activeOrders$;

  constructor(private _ordersService: OrdersService,

    private _alertController: AlertController,
    private _modalCtrl: ModalController) {
  }
 

  ngOnInit() {
    console.log('active init')
    this._activeOrders$ = this._ordersService.activeOrders.asObservable().subscribe(result => {
      this.activeOrders = result;
    });;
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
            orderedDish.orderDishStatus = 'delivered';
            this.trigger = !this.trigger;
            this._checkIfAllDelivered(order);
            this._ordersService.updateOrder(order);
          }
        }
      ]
    })
    await alert.present();
  }

  private _checkIfAllDelivered(order: Order) {
    const result = order.orderedDishes.
    filter(o => o.orderDishStatus !== 'delivered').length;
    if (!result) {
      order.orderStatus = 'finished';
      setTimeout(() => {
       this._ordersService.fetchAll();
      }, 1000);
    }
    this._ordersService.updateReadyToDeliver();
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
          "inProgress");
        console.log(orderedDish);
        order.orderedDishes.push(orderedDish);
        order.totalPrice += orderedDish.dish.dishPrice;
      }
    });
  }

  public async editOrder(order: Order) {
      console.log('edit clicked');
     const modal =  await this._modalCtrl.create({
       component:AddOrderComponent,
       componentProps: {
         data: order
       } 
      });
      await modal.present();
      modal.onDidDismiss().then(result => {
        if(result.data) this._checkIfAllDelivered(result.data);
      })
  }

  public async deleteOrder(order:Order) {
      const readyOrDelivered = order.orderedDishes.reduce((acc: number,curr:OrderedDish) =>
       (curr.orderDishStatus === 'ready' || curr.orderDishStatus === 'delivered') ? acc +1:acc,0);

       if(readyOrDelivered > 0) {
          const alert = this._alertController.create({
            header:'Uwaga',
            message:'Nie można usunąć tego zamówienia!',
            buttons: [
              {
                text:'Ok',
                role:'cancel'
              }
            ]
          });
          (await alert).present();  
       } else {
        const alert = this._alertController.create({
          message:'Usunąć to zamówienie?',
          buttons: [
            {
              text:'Anuluj',
              role:'cancel'
            },
            {
              text:'Tak',
              handler: () => {
                this._ordersService.deleteOrder(order);
                this._ordersService.fetchActive();
              },
            }
          ]
        });
        (await alert).present();  
       }
  }

  ngOnDestroy(): void {
    console.log('active destroy')
    this._activeOrders$.unsubscribe();
  }
}



