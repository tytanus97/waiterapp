import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _ordersEmplDataArr: Array<Order>;
  
  constructor(private httpClient: HttpClient) { 
      this._ordersEmplDataArr = new Array<Order>();
  }


  public addOrder(order: Order)  {
    this._ordersEmplDataArr.push(order);
    console.log(this._ordersEmplDataArr);
  }

  public getAllOrders() {
    return this._ordersEmplDataArr;
  }

  public getOrdersByStatus(status: string) {
    return this._ordersEmplDataArr.filter(o => o.orderStatus === status);
  }
}

