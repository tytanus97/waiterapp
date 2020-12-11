import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { last } from 'lodash';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
import Chart from 'chart.js';
@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
  styleUrls: ['./raport.component.scss'],
})
export class RaportComponent implements OnInit, AfterViewInit, OnDestroy {
  public dateStr;
  public monthShort = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paz', 'Lis', 'Gru'];
  public ordersByDate: Array<Order>;
  public categoryValues: Map<string, number>;
  
  public statsMap: Map<string,string>;
  public total;
  public totalOrders;
  public totalOrderedDishes;

  @ViewChild('dropDownBtn') private dropDownBtn;
  @ViewChild('dropDownList') private dropDownList;

  private dropped = false;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private _ordersService: OrdersService) { }


  ngAfterViewInit(): void {
  }


  ngOnInit() {
    this.categoryValues = new Map();
    this.statsMap = new Map();
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
    let total = 0;
    let totalOrderedDishes = 0;
    let totalOrders = 0;
    let firstOrderTime = this.ordersByDate[0].orderDate;
    let lastOrderTime = this.ordersByDate[0].orderDate;

    this.ordersByDate.flatMap(o => {
      total += o.totalPrice;
      totalOrders++;

      if(firstOrderTime.getTime() > o.orderDate.getTime()) firstOrderTime = o.orderDate;
      if(lastOrderTime.getTime() < o.orderDate.getTime()) lastOrderTime = o.orderDate;

      return o.orderedDishes;
    }).forEach(od => {
      totalOrderedDishes++;
      const category = od.dish.dishCategory;
      const value = this.categoryValues.get(category);
      this.categoryValues.set(category, value ? value + 1 : 1);
    });


    this.statsMap.set('firstOrderTime',this.formatNumber(firstOrderTime.getHours()) + ':' + this.formatNumber(firstOrderTime.getMinutes()));
    this.statsMap.set('lastOrderTime',this.formatNumber(lastOrderTime.getHours()) + ':' + this.formatNumber(lastOrderTime.getMinutes()));
    this.statsMap.set('total',total.toString());
    this.statsMap.set('totalOrderedDishes',totalOrderedDishes.toString());
    this.statsMap.set('totalOrders',totalOrders.toString());

    this.createCrowndessChart();

    
  }

  private formatNumber(num: number): string {
    return num > 9 ? num.toString():`0${num}`;
  }
  
  createCrowndessChart() {
    const data = this.processDataForCrowndess();
    const ctx = document.getElementById('crowdness');
    const crowndnessChart = new Chart(ctx,{
      type: 'bar',
      data: {
          labels: data.keys,
          datasets: [{
              label: '',
              data: data.values,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          legend: {
            labels: {
              fontSize:0
            }
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }
  processDataForCrowndess() {
    const orderHourMap: Map<number,number> = new Map();

    for(let i = 0;i<23;i++) {
      const ordersInIndexHour = this.ordersByDate.filter(o => o.orderDate.getHours() === i);
      orderHourMap.set(i,ordersInIndexHour.length);
    }

    const data  = {
      keys:Array.from(orderHourMap.keys()).map(e => this.formatNumber(e)),
      values: Array.from(orderHourMap.values())
    }

    return data;
  }


  ngOnDestroy(): void {
    console.log('raport destoryed');
  }
}

