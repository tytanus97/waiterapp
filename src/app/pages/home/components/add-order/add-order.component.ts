import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from '@ionic/angular';
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
  public totalPrice = Number(0).toFixed(2);

  constructor(
    private _dishesService: DishesService,
    private _tablesService: TablesService,
    private _waiterService: WaiterService,
    private _orderService: OrdersService,
    private _modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.tables = this._tablesService.getAllTables();
    this.orderedDishes = new Array<OrderedDish>(); 
  }


  public async goToSelectDish() {
    const selectDish = this._modalCtrl.create({
      component:ChooseDishComponent});

      (await selectDish).present();
      (await selectDish).onDidDismiss()
      .then( res => {
        if(res.data) {
          console.log(res.data);
          this.orderedDishes.push(res.data);
        } 
      });
  }

  compareFn(t1: Table, t2: Table): boolean {
    return t1 && t2 ? t1.tableId === t2.tableId : t1 === t2;
  }
}
