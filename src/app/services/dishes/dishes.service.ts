import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  public dishesExmplDataArray: Array<Dish>;
  public dishesCategoriesExmplDataSet: Set<string>;
  public orderedDishStatusSet: Set<string>;

  constructor(private httpClient: HttpClient) {

    this.dishesExmplDataArray = new Array<Dish>();
    this.dishesCategoriesExmplDataSet = new Set<string>();
    this.orderedDishStatusSet = new Set<string>();

    this.orderedDishStatusSet.add('inProgress');
    this.orderedDishStatusSet.add('ready');
    this.orderedDishStatusSet.add('delivered');
  
  
    this.dishesCategoriesExmplDataSet.add('obiad');
    this.dishesCategoriesExmplDataSet.add('sniadanie');
    this.dishesCategoriesExmplDataSet.add('kolacja');
    this.dishesCategoriesExmplDataSet.add('deser');
    this.dishesCategoriesExmplDataSet.add('lunch');
    this.dishesCategoriesExmplDataSet.add('napoj');
    this.dishesCategoriesExmplDataSet.add('zupa');


    //obiady
    this.dishesExmplDataArray.push(new Dish(1,"Schabowy z ziemniakami i surowka",12.99,
    "Kotlet schabowy z gotowanymi ziemniakami i surowka z marchewki",'obiad'));
    this.dishesExmplDataArray.push(new Dish(5,"Pierś z kurczaka gotowana na parze z ziemniakami i gotowanymi warzywami",13.00,
    "Pierś z kurczaka gotowana na parze z ziemniakami i gotowanymi warzywami",'obiad'));
    this.dishesExmplDataArray.push(new Dish(6,"Dorsz smażony z ziemniakami i surówką",15.00,
    "Przepyszny dorsz z ziemniakami i zestawem surowek",'obiad'));


    //sniadania
    this.dishesExmplDataArray.push(new Dish(2,"Jajecznica z bekonem",10.99,
    "Jajecznica z 4 jajek, 4 plastry bekonu, posypane pietruczka",'sniadanie'));
    this.dishesExmplDataArray.push(new Dish(7,"Gofr rukola parmezan",19.99,
    "Chrupiacy gofr z 2 jajkami sadzonymi, rukola, pietruszka, chipsami boczku",'sniadanie'));
    this.dishesExmplDataArray.push(new Dish(8,"Jajka w piekle",24.00,
    "2 jajka zapieczone w chilli con carne",'sniadanie'));
    this.dishesExmplDataArray.push(new Dish(4,"Francuskie tosty z owocami",15.99,
    "Tosty polane bita smietana z kawalkami kiwi",'sniadanie'));

    //lunch
    this.dishesExmplDataArray.push(new Dish(3,"Placki po wegiersku",13.99,
    "5 plackow ziemniaczanych w sosie wegierskim",'lunch'));
    this.dishesExmplDataArray.push(new Dish(9,"Bostock",21.00,
    "2 sztuki chalki nasaczonej syrome",'lunch'));
    this.dishesExmplDataArray.push(new Dish(10,'Granola Bowl',18.00,
    "Ochechy i nasiona praone na miodzie, jogurt naturalny, pulpa mango, owoce",'lunch'));

    //desery
    this.dishesExmplDataArray.push(new Dish(11,"Nalesniki maslankowe",14.00,
    "Pyszne naleśniki z dodatkiem maślanki",'deser'));
    this.dishesExmplDataArray.push(new Dish(12,"Sernik swiateczny",15.00,
    "Sernik swiateczny z polewa czekoladowa i skorka pomaranczowa",'deser'));
    this.dishesExmplDataArray.push(new Dish(13,"Pudding ryzowy z cynamonem",12.00,
    "Hiszpański deser z ryżu gotowanego na mleku z dodatkiem cynamonu",'deser'));

    //kolacje
    this.dishesExmplDataArray.push(new Dish(14,"Chlopski garnek z ziemniakami",14.00,
    "Mieszanka kielbasy, boczku, ziemniakow oraz papryki",'kolacja'));
    this.dishesExmplDataArray.push(new Dish(15,"Kanapka z tunczykiem i jajkiem",11.00,
    "Kanapka z tunczykiem i jajkiem oraz dodatkiem rukoli, musztardy miodowej i cebulki",'kolacja'));
    this.dishesExmplDataArray.push(new Dish(16,"Makaron zapiekany z cukinia i boczkiem",19.00,
    "Makaron zapiekany z cykinia i boczkiem z dodatkiem smietany, poru i natka pietruszki",'kolacja'));
    
    //zupy
    this.dishesExmplDataArray.push(new Dish(17,"Zupa krem z pieczonej papryki",10.00,
    "Zupa krem z pieczonej papryki z dodatkiem sera topionego",'zupa'));
    this.dishesExmplDataArray.push(new Dish(18,"Zupa wegierska z karpia",9.00,
    "Zupa wegierska z karpia z dodatkiem mulu",'zupa'));
    this.dishesExmplDataArray.push(new Dish(19,"Zupa koperkowa",12.99,
    "Zupa koperkowa z ziemniakami i marchewka",'zupa'));
    
    //napoje
    this.dishesExmplDataArray.push(new Dish(20,"Pepsi",3.99,
    "Pepsi",'napoj'));
    this.dishesExmplDataArray.push(new Dish(21,"Kawa",5.99,
    "Kawa",'napoj'));
    this.dishesExmplDataArray.push(new Dish(22,"Sok pomaranczowy",4.00,
    "Sok pomaranczowy",'napoj'));
   }


   getAllDishes() {
     return this.dishesExmplDataArray;
   }

   getAllCategories() {
     return this.dishesCategoriesExmplDataSet;
   }

   getAllDishesByCategory(dishCategoryName: string) {
     return this.dishesExmplDataArray.filter(d => d.dishCategory === dishCategoryName);
   }

}
