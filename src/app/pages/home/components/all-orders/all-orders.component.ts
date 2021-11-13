import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { AddOrderComponent } from '../add-order/add-order.component';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit, OnDestroy {

  public readyToDeliver: number;
  private _readyToDeliver$;

  constructor(private _ordersService: OrdersService, private _modalCtrl: ModalController) {
  }
  ngOnInit() {
    this._readyToDeliver$ = this._ordersService.getReadyToDeliver().asObservable().subscribe(value => {
      this.readyToDeliver = value;
    });
  }

  public async openNewOrderModal() {
    const newOrderModal = await this._modalCtrl.create({
      component: AddOrderComponent
    });
    await newOrderModal.present();
    newOrderModal.onDidDismiss().then(result => {
    });
  }

  ngOnDestroy(): void {
    this._readyToDeliver$.unsubscribe();
  }

}
