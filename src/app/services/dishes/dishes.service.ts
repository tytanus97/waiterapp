import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from 'src/app/models/dish';
import { DishCategory } from 'src/app/models/dishCategory';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  public dishesExmplDataArray: Array<Dish>;
  public dishesCategoriesExmplDataMap: Map<string,DishCategory>;

  constructor(private httpClient: HttpClient) {

    this.dishesExmplDataArray = new Array<Dish>();
    this.dishesCategoriesExmplDataMap = new Map<string,DishCategory>();
    
    this.dishesCategoriesExmplDataMap.set('obiad',new DishCategory(1,'obiad'));
    this.dishesCategoriesExmplDataMap.set('sniadanie',new DishCategory(2,'sniadanie'));
    this.dishesCategoriesExmplDataMap.set('kolacja',new DishCategory(3,'kolacja'));
    this.dishesCategoriesExmplDataMap.set('deser',new DishCategory(4,'deser'));
    this.dishesCategoriesExmplDataMap.set('lunch',new DishCategory(5,'lunch'));
    this.dishesCategoriesExmplDataMap.set('napoj',new DishCategory(6,'napoj'));
    this.dishesCategoriesExmplDataMap.set('zupa',new DishCategory(7,'zupa'));


    //obiady
    this.dishesExmplDataArray.push(new Dish(1,"Schabowy z ziemniakami i surowka",12.99,
    "Kotlet schabowy z gotowanymi ziemniakami i surowka z marchewki",this.dishesCategoriesExmplDataMap.get('obiad')));
    this.dishesExmplDataArray.push(new Dish(5,"Pierś z kurczaka gotowana na parze z ziemniakami i gotowanymi warzywami",13.00,
    "Pierś z kurczaka gotowana na parze z ziemniakami i gotowanymi warzywami",this.dishesCategoriesExmplDataMap.get('obiad')));
    this.dishesExmplDataArray.push(new Dish(6,"Dorsz smażony z ziemniakami i surówką",15.00,
    "Przepyszny dorsz z ziemniakami i zestawem surowek",this.dishesCategoriesExmplDataMap.get('obiad')));


    //sniadania
    this.dishesExmplDataArray.push(new Dish(2,"Jajecznica z bekonem",10.99,
    "Jajecznica z 4 jajek, 4 plastry bekonu, posypane pietruczka",this.dishesCategoriesExmplDataMap.get('sniadanie')));
    this.dishesExmplDataArray.push(new Dish(7,"Gofr rukola parmezan",19.99,
    "Chrupiacy gofr z 2 jajkami sadzonymi, rukola, pietruszka, chipsami boczku",this.dishesCategoriesExmplDataMap.get('sniadanie')));
    this.dishesExmplDataArray.push(new Dish(8,"Jajka w piekle",24.00,
    "2 jajka zapieczone w chilli con carne",this.dishesCategoriesExmplDataMap.get('sniadanie')));
    this.dishesExmplDataArray.push(new Dish(4,"Francuskie tosty z owocami",15.99,
    "Tosty polane bita smietana z kawalkami kiwi",this.dishesCategoriesExmplDataMap.get('sniadanie')));

    //lunch
    this.dishesExmplDataArray.push(new Dish(3,"Placki po wegiersku",13.99,
    "5 plackow ziemniaczanych w sosie wegierskim",this.dishesCategoriesExmplDataMap.get('lunch')));
    this.dishesExmplDataArray.push(new Dish(9,"Bostock",21.00,
    "2 sztuki chalki nasaczonej syrome",this.dishesCategoriesExmplDataMap.get('lunch')));
    this.dishesExmplDataArray.push(new Dish(10,'Granola Bowl',18.00,
    "Ochechy i nasiona praone na miodzie, jogurt naturalny, pulpa mango, owoce",this.dishesCategoriesExmplDataMap.get('lunch')));

    //desery
    this.dishesExmplDataArray.push(new Dish(11,"Nalesniki maslankowe",14.00,
    "Pyszne naleśniki z dodatkiem maślanki",this.dishesCategoriesExmplDataMap.get('deser')));
    this.dishesExmplDataArray.push(new Dish(12,"Sernik swiateczny",15.00,
    "Sernik swiateczny z polewa czekoladowa i skorka pomaranczowa",this.dishesCategoriesExmplDataMap.get('deser')));
    this.dishesExmplDataArray.push(new Dish(13,"Pudding ryzowy z cynamonem",12.00,
    "Hiszpański deser z ryżu gotowanego na mleku z dodatkiem cynamonu",this.dishesCategoriesExmplDataMap.get('deser')));

    //kolacje
    this.dishesExmplDataArray.push(new Dish(14,"Chlopski garnek z ziemniakami",14.00,
    "Mieszanka kielbasy, boczku, ziemniakow oraz papryki",this.dishesCategoriesExmplDataMap.get('kolacja')));
    this.dishesExmplDataArray.push(new Dish(15,"Kanapka z tunczykiem i jajkiem",11.00,
    "Kanapka z tunczykiem i jajkiem oraz dodatkiem rukoli, musztardy miodowej i cebulki",this.dishesCategoriesExmplDataMap.get('kolacja')));
    this.dishesExmplDataArray.push(new Dish(16,"Makaron zapiekany z cukinia i boczkiem",19.00,
    "Makaron zapiekany z cykinia i boczkiem z dodatkiem smietany, poru i natka pietruszki",this.dishesCategoriesExmplDataMap.get('kolacja')));
    
    //zupy
    this.dishesExmplDataArray.push(new Dish(17,"Zupa krem z pieczonej papryki",10.00,
    "Zupa krem z pieczonej papryki z dodatkiem sera topionego",this.dishesCategoriesExmplDataMap.get('zupa')));
    this.dishesExmplDataArray.push(new Dish(18,"Zupa wegierska z karpia",9.00,
    "Zupa wegierska z karpia z dodatkiem mulu",this.dishesCategoriesExmplDataMap.get('zupa')));
    this.dishesExmplDataArray.push(new Dish(19,"Zupa koperkowa",12.99,
    "Zupa koperkowa z ziemniakami i marchewka",this.dishesCategoriesExmplDataMap.get('zupa')));
    
    //napoje
    this.dishesExmplDataArray.push(new Dish(20,"Pepsi",3.99,
    "Pepsi",this.dishesCategoriesExmplDataMap.get('napoj')));
    this.dishesExmplDataArray.push(new Dish(20,"Kawa",5.99,
    "Kawa",this.dishesCategoriesExmplDataMap.get('napoj')));
    this.dishesExmplDataArray.push(new Dish(20,"Sok pomaranczowy",4.00,
    "Sok pomaranczowy",this.dishesCategoriesExmplDataMap.get('napoj')));

    
   }

}
