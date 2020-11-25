import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit {

  public readyToDeliver:number;


  constructor(private _ordersService: OrdersService) {
  }
  ngOnInit() {
  
    this._ordersService.getReadyToDeliver().subscribe(value => {
      this.readyToDeliver = value;
    })
    
  }

}
