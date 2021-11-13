import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js'
import { stubFalse } from 'lodash';
@Component({
  selector: 'app-categories-chart',
  templateUrl: './categories-chart.component.html',
  styleUrls: ['./categories-chart.component.scss'],
})
export class CategoriesChartComponent implements OnInit {

  @Input()
  public dataObservable; 

  private data$;
  private categoryChart: Chart;
  private categoryValues;
  constructor() { }

  ngOnInit() {
    this.data$ = this.dataObservable.subscribe(e => {
      this.categoryValues = e;
      this.createCategoriesChart();
    });
  }
  createCategoriesChart() {
    if(this.categoryChart) this.categoryChart.destroy();
    const data = this.processDataForCategories();
    const ctx = document.getElementById('categories');
    this.categoryChart = new Chart(ctx,{
      type: 'doughnut',
      data: {
        labels: data.labels,
          datasets: [{
              data: data.values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(150, 0, 255, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(150, 0, 255, 1)'
          ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          position:'left'
        },
          scales: {
              yAxes: [{
                  gridLines: {
                    display:false
                  },
                  ticks: {
                      display: false
                  }}]} }});
  }

  private processDataForCategories() {
    return {
      labels:Array.from(this.categoryValues.keys()),
      values:Array.from(this.categoryValues.values())
    }
  }
}
