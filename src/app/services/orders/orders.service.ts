import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderStatus } from 'src/app/models/orderStatus';

import { Plugins } from '@capacitor/core';
import { WaiterService } from '../waiters/waiter.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public ordersEmplDataArr: Array<Order>;
  public orderStatusExmplDataArr: Map<string,OrderStatus>;
  
  constructor(private httpClient: HttpClient) { 
      this.ordersEmplDataArr = new Array<Order>();
      this.orderStatusExmplDataArr = new Map<string,OrderStatus>();
      
      this.orderStatusExmplDataArr.set('active',new OrderStatus(1,'active'));
      this.orderStatusExmplDataArr.set('done',new OrderStatus(2,'done'));
      this.orderStatusExmplDataArr.set('canceled',new OrderStatus(3,'canceled'));
  }

}

