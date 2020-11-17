import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { ChangeDetectorRef, Component, DoCheck, ElementRef, IterableDiffer, IterableDiffers, KeyValueDiffer, KeyValueDiffers, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonCard, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { OrderedDish } from 'src/app/models/orderedDish';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ChooseDishComponent } from '../../../add-order/components/choose-dish/choose-dish.component';

@Component({
  selector: 'app-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit, DoCheck {

  public activeOrders: Array<Order>;
  private _today: Date;

  private orderedDishDiffer = new Map<number,any>();
  private orderedDishMap = new Map<number,OrderedDish>();

  private arrayDiffer: any;


  constructor(private _ordersService: OrdersService,
    private _route: ActivatedRoute,
    private _alertController: AlertController,
    private _differs: KeyValueDiffers,
    private _changeRef: ChangeDetectorRef,
    private _modalCtrl: ModalController) {
   // console.log('ActiveTab konstruktor')
    this._today = new Date();

    this._route.data.subscribe(result => {
     // console.log('new orders incoming');
      this.activeOrders = result.activeOrders;
    })
  }
  ngDoCheck(): void {
    //console.log('zmiany');
    
    for(let [key, odDiffer] of this.orderedDishDiffer) {
      let odChanges = odDiffer.diff(this.orderedDishMap.get(key));
      if(odChanges) {
        odChanges.forEachChangedItem(record => {
          this._changeRef.markForCheck();
          /* console.log(record.previousValue);
          console.log(record.currentValue); */
          console.log('dodano');
        })
      }
    }
    this._changeRef.detectChanges();
    }
  
  ngOnInit() {
    this.activeOrders = this._ordersService.getAllOrdersByDateAndStatus(this._today, 'active');
  //  this.activeOrders.flatMap(ao => ao.orderedDishes).forEach(od => console.log(od));
    this.activeOrders.flatMap(ao => ao.orderedDishes).forEach(od => {
      this.orderedDishDiffer[od.orderedDishId] = this._differs.find(od).create();
      this.orderedDishMap[od.orderedDishId] = od;
      
    })
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
      setTimeout(() => {
        this.activeOrders = this._ordersService.getAllOrdersByDateAndStatus(this._today, 'active');
      }, 1000);

    }
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



