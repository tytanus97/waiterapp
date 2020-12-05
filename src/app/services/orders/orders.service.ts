import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { WaiterService } from '../waiters/waiter.service';
import { OrderedDish } from 'src/app/models/orderedDish';
import { DishesService } from '../dishes/dishes.service';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _ordersEmplDataArr: Array<Order>;
  private _readyToDeliver: BehaviorSubject<number>;

  public activeOrders: BehaviorSubject<Array<Order>>;
  public finishedOrders: BehaviorSubject<Array<Order>>;
  public closedOrders: BehaviorSubject<Array<Order>>;

  private _currentDate: Date;
  
  constructor(private _httpClient: HttpClient,private _waiterService: WaiterService,private _dishService: DishesService) { 

      this._readyToDeliver = new BehaviorSubject<number>(null);
      this.activeOrders = new BehaviorSubject<Array<Order>>(null);
      this.finishedOrders = new BehaviorSubject<Array<Order>>(null);
      this.closedOrders = new BehaviorSubject<Array<Order>>(null);

      this._currentDate = new Date();

      this._ordersEmplDataArr = new Array<Order>();
    
    const sniadania = this._dishService.getAllDishesByCategory('sniadanie');
    const obiady = this._dishService.getAllDishesByCategory('obiad');
    const kolacje = this._dishService.getAllDishesByCategory('kolacja');


    const orderedDishes = new Array<OrderedDish>();

    orderedDishes.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[0],'inProgress'));
    orderedDishes.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[0],'delivered'));
    orderedDishes.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered'));
    orderedDishes.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[2],'ready'));

  
    let tmpOrder = new Order('1',this._waiterService.getLoggedWaiter(),5,new Date(this._currentDate.getTime() - (1000 * 60 * 15))
    ,orderedDishes.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes);
    this._ordersEmplDataArr.push(tmpOrder);


    const orderedDishes2 = new Array<OrderedDish>();

    orderedDishes2.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[0],'delivered'));
    orderedDishes2.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[0],'delivered'));
    orderedDishes2.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered'));
    orderedDishes2.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[2],'delivered'));

    tmpOrder = new Order('2',this._waiterService.getLoggedWaiter(),4,new Date(this._currentDate.getTime() - (1000 * 60 * 10))
    ,orderedDishes2.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'closed',orderedDishes2);
    this._ordersEmplDataArr.push(tmpOrder);


    const orderedDishes3 = new Array<OrderedDish>();

    orderedDishes3.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[0],'inProgress'));
    orderedDishes3.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[0],'delivered'));
    orderedDishes3.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered'));
    orderedDishes3.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[2],'ready'));

    tmpOrder = new Order('3',this._waiterService.getLoggedWaiter(),2,new Date(this._currentDate.getTime() - (1000 * 60 * 5))
    ,orderedDishes3.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes3); 
    this._ordersEmplDataArr.push(tmpOrder);

    const orderedDishes4 = new Array<OrderedDish>();

    orderedDishes4.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[0],'delivered'));
    orderedDishes4.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[0],'delivered'));
    orderedDishes4.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered'));
    orderedDishes4.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[2],'delivered'));

  
    let tmpOrder4 = new Order('4',this._waiterService.getLoggedWaiter(),5,new Date(this._currentDate.getTime() -(1000*60*60*24)- (1000 * 60 * 15))
    ,orderedDishes4.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes4);
    this._ordersEmplDataArr.push(tmpOrder4);

    const orderedDishes5 = new Array<OrderedDish>();

    orderedDishes5.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[0],'delivered'));
    orderedDishes5.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[0],'delivered'));
    orderedDishes5.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered'));
    orderedDishes5.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[2],'delivered'));

  
    let tmpOrder5 = new Order('5',this._waiterService.getLoggedWaiter(),5,new Date(this._currentDate.getTime()-(1000*60*60*24) - (1000 * 60 * 15))
    ,orderedDishes5.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes5);
    this._ordersEmplDataArr.push(tmpOrder5);

    const orderedDishes6 = new Array<OrderedDish>();

    orderedDishes6.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[0],'delivered'));
    orderedDishes6.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[0],'delivered'));
    orderedDishes6.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered'));
    orderedDishes6.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[2],'delivered'));

  
    let tmpOrder6 = new Order('6',this._waiterService.getLoggedWaiter(),5,new Date(this._currentDate.getTime()-(1000*60*60*24) - (1000 * 60 * 15))
    ,orderedDishes6.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes6);
    this._ordersEmplDataArr.push(tmpOrder6);

    const orderedDishes7 = new Array<OrderedDish>();

    orderedDishes7.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[0],'delivered'));
    orderedDishes7.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[0],'delivered'));
    orderedDishes7.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered'));
    orderedDishes7.push(new OrderedDish(this.getRandomId(),this._dishService.getAllDishesByCategory('obiad')[2],'delivered'));

  
    let tmpOrder7 = new Order('7',this._waiterService.getLoggedWaiter(),5,new Date(this._currentDate.getTime()-(1000*60*60*24) - (1000 * 60 * 15))
    ,orderedDishes7.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes7);
    this._ordersEmplDataArr.push(tmpOrder7);
    
    this.fetchAll();

    this.updateReadyToDeliver();

    setTimeout(() => {
      orderedDishes[0].orderDishStatus = 'ready';
      this.updateReadyToDeliver();
    },5000);
  }


  public getRandomId():number {
    return Math.floor(Math.random() * 100000);
  }
  public addOrder(order: Order)  {
    this._ordersEmplDataArr.push(order);
    console.log(this._ordersEmplDataArr);
    this.fetchActive();
  }

  public getAllOrdersByDate(date: Date) {
    return this._ordersEmplDataArr.filter(o => o.orderDate.toDateString() === date.toDateString());
  }

  public getAllOrdersByDateAndStatus(date: Date, status: string) {
    return this._ordersEmplDataArr.filter(o => {
      return ((o.orderDate.toDateString() === date.toDateString()) && (o.orderStatus === status));
    })
  }

  public getOrdersByStatus(status: string) {
    return this._ordersEmplDataArr.filter(o => o.orderStatus === status);
  }

  public setReadyToDeliver(value: number) {
    this._readyToDeliver.next(value);
  }
  public getReadyToDeliver() {
    return this._readyToDeliver;
  }
  public updateReadyToDeliver() {
    const readyToDeliver = this._ordersEmplDataArr.flatMap(o => o.orderedDishes)
    .reduce((acc:number,curr:OrderedDish) =>  curr.orderDishStatus === 'ready'?acc+1:acc,0); 

    this._readyToDeliver.next(readyToDeliver);
  }
  
  public deleteOrder(order: Order) {
    this._ordersEmplDataArr.splice(this._ordersEmplDataArr.indexOf(order),1);

  }

  public fetchActive() {
    this.activeOrders.next(this.getAllOrdersByDateAndStatus(this._currentDate,'active'));
  }

  public fetchFinished() {
    this.finishedOrders.next(this.getAllOrdersByDateAndStatus(this._currentDate,'finished'));
  }
  public fetchClosed() {
    this.closedOrders.next(this.getAllOrdersByDateAndStatus(this._currentDate,'closed'));
  }

  public fetchAll() {
    this.fetchActive();
    this.fetchClosed();
    this.fetchFinished();
  }
}

