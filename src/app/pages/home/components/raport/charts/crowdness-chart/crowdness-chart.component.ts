import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
@Component({
  selector: 'app-crowdness-chart',
  templateUrl: './crowdness-chart.component.html',
  styleUrls: ['./crowdness-chart.component.scss'],
})
export class CrowdnessChartComponent implements OnInit, OnDestroy{
  
  private crowdnessChart: Chart;
  private ordersByDate;

  @Input()
  public dataObservable: Observable<Array<Order>>;
  private data$;
  constructor() { }
 

  ngOnInit() {
    this.data$ = this.dataObservable.subscribe(e => {
     console.log(e);
      this.ordersByDate = e;
      this.createCrowndessChart();
    })
  }
  
  createCrowndessChart() {
    if(this.crowdnessChart) this.crowdnessChart.destroy();
    const data = this.processDataForCrowndess();
    const ctx = document.getElementById('crowdness');
    this.crowdnessChart = new Chart(ctx,{
      type: 'bar',
      data: {
          labels: data.keys,
          datasets: [{
              data: data.values,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          legend: {
            display:false
          },
          scales: {
            yAxes: [{
              gridLines: {
                display:false
              },
              ticks: {
                display:false
              }
          }]
          }
      }
  });
  }

  
  
  processDataForCrowndess() {
    const orderHourMap: Map<number,number> = new Map();

    for(let i = 8;i<=22;i++) {
      const ordersInIndexHour = this.ordersByDate.filter(o => o.orderDate.getHours() === i);
      orderHourMap.set(i,ordersInIndexHour.length);
    }

    const data  = {
      keys:Array.from(orderHourMap.keys()).map(e => this.formatNumber(e)),
      values: Array.from(orderHourMap.values())
    }
    return data;
  }
  
  private formatNumber(num: number): string {
    return num > 9 ? num.toString():`0${num}`;
  }

  ngOnDestroy(): void {
  this.data$.unsubscribe(); 
 }
}
