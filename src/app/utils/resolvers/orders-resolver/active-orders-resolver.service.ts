import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService implements Resolve<Array<Order>>{

  constructor(private _orderService: OrdersService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Order[] | Observable<Order[]> | Promise<Order[]> {
    const status = route.data['status'];

    return of(this._orderService.getAllOrdersByDateAndStatus(new Date(),status));
  }
}
