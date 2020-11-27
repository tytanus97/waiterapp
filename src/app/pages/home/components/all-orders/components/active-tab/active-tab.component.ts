import { AfterViewInit, ApplicationRef, ChangeDetectorRef, Component, DoCheck, ElementRef, KeyValueDiffers, OnInit, QueryList, Renderer2, ViewChildren, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, GestureController, IonCard, ModalController } from '@ionic/angular';
import { drop } from 'lodash';
import { Order } from 'src/app/models/order';
import { OrderedDish } from 'src/app/models/orderedDish';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ChooseDishComponent } from '../../../add-order/components/choose-dish/choose-dish.component';

@Component({
  selector: 'app-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit, AfterViewInit {

  public activeOrders: Array<Order>;
  private _today: Date;
  public trigger: boolean = false;
  private _longPressActive = false;


  @ViewChildren('cardContainer', { read: ElementRef }) private ordersCards: QueryList<ElementRef>;

  constructor(private _ordersService: OrdersService,
    private _route: ActivatedRoute,
    private _alertController: AlertController,
    private _modalCtrl: ModalController,
    private _gestureCtrl: GestureController,
    private _renderer: Renderer2) {

    this._today = new Date();

    this._route.data.subscribe(result => {
      this.activeOrders = result.activeOrders;
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    const cardArr = this.ordersCards.toArray();

    this.bindLongPress(cardArr);

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

            this._checkIfAllDelivered(order, orderedDish);
          }
        }
      ]
    })
    await alert.present();
  }

  private _checkIfAllDelivered(order: Order, orderedDish: OrderedDish) {
    orderedDish.orderDishStatus = 'delivered';
    const result = order.orderedDishes.filter(o => o.orderDishStatus !== 'delivered').length;
    if (!result) {
      order.orderStatus = 'finished';
      setTimeout(() => {
        this.activeOrders = this._ordersService.getAllOrdersByDateAndStatus(this._today, 'active');
      }, 1000);
    }
    this._ordersService.updateReadyToDeliver();
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
          "inProgress");
        console.log(orderedDish);
        order.orderedDishes.push(orderedDish);
        order.totalPrice += orderedDish.dish.dishPrice;
      }
    });
  }

  private bindLongPress(cardArr: Array<ElementRef>) {
    console.log(cardArr);

    cardArr.forEach((item: ElementRef) => {
      console.log(item);
      const gesture = this._gestureCtrl.create({
        el: item.nativeElement,
        gestureName: 'long-press',
        onStart: () => {
          console.log('long press start');
          this._longPressActive = true;
          this.countPressDuration(0,item);
        },
        onEnd: () => {
          this._longPressActive = false;
          console.log('long press stop');
        }
      })
      gesture.enable(true);
    })
  }

  private countPressDuration(pressDuration: number,element: ElementRef) {
    
    setTimeout(() => {
      if(this._longPressActive) {
        console.log(pressDuration);
        pressDuration++;
        if(pressDuration > 3) {
          console.log('XD');
            this._longPressActive = false;
            const lastChild = element.nativeElement.lastChild;  
            const dropDownAnimation : Animation =  lastChild.animate(
            [
              {transform:'translateY(-100%)',height:0,opacity:0},
              {
                opacity:0
              },
              {transform:'translateY(0)',height:'initial',opacity:1}
            ],
            {
              duration:500,
              fill:'forwards',
              easing:'ease-out'
            });
        } else {
          this.countPressDuration(pressDuration,element);
        }
      }
    },300);
  }
}



