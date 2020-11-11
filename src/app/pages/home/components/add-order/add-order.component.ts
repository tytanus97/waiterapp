import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Dish } from 'src/app/models/dish';
import { Order } from "src/app/models/order";
import { OrderedDish } from "src/app/models/orderedDish";
import { Table } from "src/app/models/Table";
import { DishesService } from "src/app/services/dishes/dishes.service";
import { OrdersService } from "src/app/services/orders/orders.service";
import { TablesService } from "src/app/services/tables/tables.service";
import { WaiterService } from "src/app/services/waiters/waiter.service";
import { ChooseDishComponent } from './components/choose-dish/choose-dish.component';

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.scss"],
})
export class AddOrderComponent implements OnInit {
  public tables: Array<number>;
  public order: Order;
  public chosenTable: number;
  public orderedDishes: Array<OrderedDish>;
  public totalPrice = 0;
  public orderedDishesAnnotations: Map<OrderedDish,string>;
  private _allDishes: Array<Dish>;
  private _dishesCategories: Array<string>;

  constructor(
    private _dishesService: DishesService,
    private _tablesService: TablesService,
    private _waiterService: WaiterService,
    private _orderService: OrdersService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _zone: NgZone,
    private _toastCtrl: ToastController,
    private _changeRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    
    this.tables = this._tablesService.getAllTables();
    this.orderedDishes = new Array<OrderedDish>(); 
    this.orderedDishesAnnotations = new Map();
 /*    this._allDishes = this._dishesService.getAllDishes();
    this._dishesCategories = this._dishesService.getAllCategories(); */
  }

  public async goToSelectDish() {
    const selectDish = this._modalCtrl.create({
      component:ChooseDishComponent});

      (await selectDish).present();
      (await selectDish).onDidDismiss()
      .then( res => {
        if(res.data) {
          const orderedDish = new OrderedDish(0,res.data.dish,this.order,'active',null);
          this.orderedDishes.push(orderedDish);
          this.updateTotalPrice();
        } 
      });
  }

  public async showDishOption(orderedDish: OrderedDish) {

    const orderedDishOption = await this._alertCtrl.create({
      header:'Opcje',
      inputs:[
          {
            name:'annotation',
            placeholder:'Uwagi',
            value:this.orderedDishesAnnotations.get(orderedDish),
            type:'text'
          }
      ],
      buttons: [
        {
          text:'Usuń danie',
          handler: () => this.deleteOrderedDish(orderedDish),
          cssClass:'optionButton'
        },
        {
          text:'Ok',
          handler: data => {
            if(data.annotation) {
             this._zone.run(() =>  this.orderedDishesAnnotations.set(orderedDish,data.annotation))
            }
          }
        }
      ]
    });
    
    (await orderedDishOption).present();
  }

  private deleteOrderedDish(orderedDish: OrderedDish) {
    this.orderedDishes = this.orderedDishes.filter(od => od != orderedDish);
    this.orderedDishesAnnotations.delete(orderedDish);
    this._zone.run(() => this.updateTotalPrice());
  }
  private updateTotalPrice() {
    let sum = 0;
    this.orderedDishes.forEach(od => sum += od.dish.dishPrice);
    this.totalPrice = sum;
  }

  public deleteAnnotation(orderedDishAnnotation:{key:OrderedDish,value:string}) {
    console.log(orderedDishAnnotation);
    this.orderedDishesAnnotations.delete(orderedDishAnnotation.key);
    this.orderedDishes.find((od) => orderedDishAnnotation.key == od).orderedDishAnnotation = undefined;
    console.log(this.orderedDishesAnnotations);
  }

  public async sendOrder() {
    if(this.validate()) {
      
    } else {
     await this.prompt('Brakujace dane!','warning');
    }
  }

  private validate() : boolean {
    console.log(this.orderedDishes.length, this.chosenTable)
    return this.orderedDishes.length > 0 && this.chosenTable !== undefined;
  }

  compareFn(t1: Table, t2: Table): boolean {
    return t1 && t2 ? t1.tableId === t2.tableId : t1 === t2;
  }

  private async prompt(message: string,color:string) {
    const warningToast = this._toastCtrl.create({
      message:message,
      duration:2000,
      position:'bottom',
      animated:true,
      color:color
    });
    (await warningToast).present();
  }
}
