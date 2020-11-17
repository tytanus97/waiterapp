import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Plugins } from '@capacitor/core';
import { WaiterService } from '../waiters/waiter.service';
import { OrderedDish } from 'src/app/models/orderedDish';
import { DishesService } from '../dishes/dishes.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private _ordersEmplDataArr: Array<Order>;
  
  constructor(private _httpClient: HttpClient,private _waiterService: WaiterService,private _dishService: DishesService) { 
      this._ordersEmplDataArr = new Array<Order>();
    
    const sniadania = this._dishService.getAllDishesByCategory('sniadanie');
    const obiady = this._dishService.getAllDishesByCategory('obiad');
    const kolacje = this._dishService.getAllDishesByCategory('kolacja');


    const orderedDishes = new Array<OrderedDish>();

    orderedDishes.push(new OrderedDish(1,this._dishService.getAllDishesByCategory('sniadanie')[0],'inProgress','asfasdf asdfasdf'));
    orderedDishes.push(new OrderedDish(2,this._dishService.getAllDishesByCategory('obiad')[0],'delivered','asfasdf sdfasfasdfsd'));
    orderedDishes.push(new OrderedDish(3,this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered','asfasdf asdfasdf'));
    orderedDishes.push(new OrderedDish(4,this._dishService.getAllDishesByCategory('obiad')[2],'ready',''));

    let tmpOrder = new Order('1',this._waiterService.getLoggedWaiter(),5,new Date(new Date().getTime() - (1000 * 60 * 15))
    ,orderedDishes.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes);
    this._ordersEmplDataArr.push(tmpOrder);

    
    const orderedDishes2 = new Array<OrderedDish>();

    orderedDishes2.push(new OrderedDish(1,this._dishService.getAllDishesByCategory('sniadanie')[0],'inProgress','asfasdf asdfasdf'));
    orderedDishes2.push(new OrderedDish(2,this._dishService.getAllDishesByCategory('obiad')[0],'delivered','asfasdf sdfasfasdfsd'));
    orderedDishes2.push(new OrderedDish(3,this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered','asfasdf asdfasdf'));
    orderedDishes2.push(new OrderedDish(4,this._dishService.getAllDishesByCategory('obiad')[2],'ready',''));

    tmpOrder = new Order('2',this._waiterService.getLoggedWaiter(),4,new Date(new Date().getTime() - (1000 * 60 * 10))
    ,orderedDishes2.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes2); 
    this._ordersEmplDataArr.push(tmpOrder);


    const orderedDishes3 = new Array<OrderedDish>();

    orderedDishes3.push(new OrderedDish(1,this._dishService.getAllDishesByCategory('sniadanie')[0],'inProgress','asfasdf asdfasdf'));
    orderedDishes3.push(new OrderedDish(2,this._dishService.getAllDishesByCategory('obiad')[0],'delivered','asfasdf sdfasfasdfsd'));
    orderedDishes3.push(new OrderedDish(3,this._dishService.getAllDishesByCategory('sniadanie')[1],'delivered','asfasdf asdfasdf'));
    orderedDishes3.push(new OrderedDish(4,this._dishService.getAllDishesByCategory('obiad')[2],'ready',''));

    tmpOrder = new Order('3',this._waiterService.getLoggedWaiter(),2,new Date(new Date().getTime() - (1000 * 60 * 5))
    ,orderedDishes3.reduce((acc,curr) => acc+curr.dish.dishPrice,0),'active',orderedDishes3); 
    this._ordersEmplDataArr.push(tmpOrder);


    setTimeout(() => {
      orderedDishes[0].orderDishStatus = 'ready';
    },5000);


  }


  public addOrder(order: Order)  {
    this._ordersEmplDataArr.push(order);
    console.log(this._ordersEmplDataArr);
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
}

