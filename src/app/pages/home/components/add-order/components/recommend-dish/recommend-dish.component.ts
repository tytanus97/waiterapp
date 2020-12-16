import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Dish } from 'src/app/models/dish';
import { DishesService } from 'src/app/services/dishes/dishes.service';

@Component({
  selector: 'app-recommend-dish',
  templateUrl: './recommend-dish.component.html',
  styleUrls: ['./recommend-dish.component.scss'],
})
export class RecommendDishComponent implements OnInit {
  public recommendedDishArr: Array<Dish>;
  constructor(private modalCtrl: ModalController,
              private _dishesService: DishesService) { 

    this.recommendedDishArr = new Array();
  }

  ngOnInit() {}

  public randomize() {
    const randomizedDish = this._dishesService.getRandomDish()
    this.recommendedDishArr.push(randomizedDish);
    console.log(randomizedDish);
    
  }

  public back() {
    this.modalCtrl.dismiss();
  }


}
