import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js'
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
      type: 'pie',
      data: {
        labels: data.labels,
          datasets: [{
              data: data.values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(0, 150, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(150, 150, 255, 1)'
          ],
              borderWidth: 1
          }]
      },
      options: {
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

  private processDataForCategories() {
    console.log(Array.from(this.categoryValues.keys()));
    return {
      labels:Array.from(this.categoryValues.keys()),
      values:Array.from(this.categoryValues.values())
    }
  }
}
