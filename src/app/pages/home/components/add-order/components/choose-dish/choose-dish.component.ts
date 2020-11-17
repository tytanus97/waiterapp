import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Dish } from 'src/app/models/dish';
import { DishCategory } from 'src/app/models/dishCategory';
import { DishesService } from 'src/app/services/dishes/dishes.service';

@Component({
  selector: 'app-choose-dish',
  templateUrl: './choose-dish.component.html',
  styleUrls: ['./choose-dish.component.scss'],
})
export class ChooseDishComponent implements OnInit {
  private allDishes: Array<Dish>;
  public dishesWithCategories: Map<string,Array<Dish>>;
  public dishCategories: Set<string>
  public allCategory = 'wszystkie';
  public selectedCategory;
  public selectedDish;

  constructor(private _dishesService: DishesService,private _modalController: ModalController) { }

  ngOnInit() {
  this.allDishes = this._dishesService.getAllDishes();
  this.dishCategories = this._dishesService.getAllCategories();
  this.selectedCategory = this.allCategory;
  this.dishesWithCategories = new Map();
  this.allDishes.forEach(d => {
    let dishSubArray = this.dishesWithCategories.get(d.dishCategory);
    if(!dishSubArray) dishSubArray = new Array<Dish>();
    dishSubArray.push(d);
    this.dishesWithCategories.set(d.dishCategory,dishSubArray);
    })
  }

  public async addDish(dish: Dish) {
    await this._modalController.dismiss({dish});
  }

  public async cancel() {
    await this._modalController.dismiss();
  }

}
