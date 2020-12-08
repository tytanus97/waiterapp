import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
  styleUrls: ['./raport.component.scss'],
})
export class RaportComponent implements OnInit, OnDestroy {
  public dateStr;
  public monthShort = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paz', 'Lis', 'Gru'];
  public ordersByDate: Array<Order>;
  public categoryValues: Map<string, number>;
  public total;
  public totalOrders;
  public totalOrderedDishes;

  @ViewChild('dropDownBtn') private dropDownBtn;
  @ViewChild('dropDownList') private dropDownList;

  private dropped = false;

  constructor(private _ordersService: OrdersService) { }


  ngOnInit() {
    this.categoryValues = new Map();
    console.log('raport init');
  }
  public dateChanged(event) {
    this.ordersByDate = this._ordersService.getAllOrdersByDateAndStatus(new Date(Date.parse(this.dateStr)), 'closed');
    this.categoryValues.clear();
    this.fetchStats();
  }

  public toggleDropDown() {
    this.dropDownBtn.el.animate([{},
    { transform: `rotate(${this.dropped ? 0 : 180}deg)` }
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-out'
    });
    if (!this.dropped) {
      this.dropDownList.el.animate([
        { maxHeight: 0 },
        { maxHeight: '300px' }
      ], {
        duration: 600,
        fill: 'forwards',
        easing: 'ease-out'
      });
    } else {
      this.dropDownList.el.animate([
        { maxHeight: 0 }
      ], {
        duration: 200,
        fill: 'forwards',
        easing: 'ease-out'
      });
    }
    this.dropped = !this.dropped;
  }

  private fetchStats() {
    this.total = 0;
    this.totalOrderedDishes = 0;
    this.totalOrders = 0;

    this.ordersByDate.flatMap(o => {
      this.total += o.totalPrice;
      this.totalOrders++;
      return o.orderedDishes;
    }).forEach(od => {
      this.totalOrderedDishes++;
      const category = od.dish.dishCategory;
      const value = this.categoryValues.get(category);
      this.categoryValues.set(category, value ? value + 1 : 1);
    });
  }
  ngOnDestroy(): void {
    console.log('raport destoryed');
  }
}

