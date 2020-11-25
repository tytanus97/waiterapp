import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { Order } from "src/app/models/order";
import { OrderedDish } from "src/app/models/orderedDish";
import { OrdersService } from "src/app/services/orders/orders.service";
import { TablesService } from "src/app/services/tables/tables.service";
import { WaiterService } from "src/app/services/waiters/waiter.service";
import { ChooseDishComponent } from "./components/choose-dish/choose-dish.component";
import 'lodash';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
declare let _ :any;

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.scss"],
})
export class AddOrderComponent implements OnInit {
  public tables: Array<number>;
  public chosenTable: number;
  public orderAnnotation: string;
  public orderedDishes: Array<OrderedDish>;
  public totalPrice = 0;
  private _currentOrder: Order;

  constructor(
    private _tablesService: TablesService,
    private _waiterService: WaiterService,
    private _orderService: OrdersService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _zone: NgZone,
    private _toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    this.tables = this._tablesService.getAllTables();
    this.orderedDishes = new Array<OrderedDish>();
    this._currentOrder = new Order("0");
  }

  public async goToSelectDish() {
    const selectDish = this._modalCtrl.create({
      component: ChooseDishComponent,
    });

    (await selectDish).present();
    (await selectDish).onDidDismiss().then((res) => {
      if (res.data) {
        const orderedDish = new OrderedDish(
          0,
          res.data.dish,
          "inProgress");
        this.orderedDishes.push(orderedDish);
        this.updateTotalPrice();
      }
    });
  }

  public async showDishOption(orderedDish: OrderedDish) {
    const orderedDishOption = await this._alertCtrl.create({
      message:'Usunąć danie z zamówienia?',
      buttons: [
        {
          text:'Nie',
          role:'cancel'
        },
        {
          text: "Tak",
          handler: () => this.deleteOrderedDish(orderedDish),
          cssClass: "optionButton",
        }
       
      ],
    });

    (await orderedDishOption).present();
  }

  private deleteOrderedDish(orderedDish: OrderedDish) {
    this.orderedDishes = this.orderedDishes.filter((od) => od != orderedDish);
    this._zone.run(() => this.updateTotalPrice());
  }
  private updateTotalPrice() {
    let sum = 0;
    this.orderedDishes.forEach((od) => (sum += od.dish.dishPrice));
    this.totalPrice = sum;
  }



  public async sendOrder() {
    if (this.validate()) {
      this._currentOrder.orderId =  String(Math.floor(Math.random() * 20));
      this._currentOrder.table = this.chosenTable;
      this._currentOrder.orderDate = new Date();
      this._currentOrder.orderedDishes = this.orderedDishes;
      this._currentOrder.orderStatus = 'active';
      this._currentOrder.totalPrice = this.totalPrice;
      this._currentOrder.waiter = this._waiterService.getLoggedWaiter();
      this._currentOrder.orderAnnotation = this.orderAnnotation;
      const orderTransfer: Order =   _.cloneDeep(this._currentOrder); // JSON.parse(JSON.stringify(this._currentOrder));
      this._orderService.addOrder(orderTransfer);
      this.prompt('Dodano zamowienie','success');
      this.reset();
    } else {
      await this.prompt("Brakujace dane!", "warning");
    }
  }

  private validate(): boolean {
    return this.orderedDishes.length > 0 && this.chosenTable !== undefined;
  }


  private async prompt(message: string, color: string) {
    this._toastCtrl.create({
      message: message,
      duration: 1000,
      position:'top',
      cssClass:'alertToast',
      color: color,
    }).then(toast => toast.present())
    .finally(() => console.log('toast presented'));

  }

  private reset() {
    
    this._currentOrder = new Order("0");
    this.orderedDishes.length = 0;
    this.chosenTable = undefined;
    this.totalPrice = 0;
    this.orderAnnotation = '';
  }

  public async openQuestionnaire() {

    const questionnaire = await this._modalCtrl.create({component:QuestionnaireComponent});

    await questionnaire.present();
    await questionnaire.onDidDismiss().then(res => {
      console.log('questionnaire dismissed');
    });

  }
}
