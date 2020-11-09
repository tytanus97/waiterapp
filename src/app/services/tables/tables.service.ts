import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Table } from 'src/app/models/Table';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  public tablesExampleDataArr: Array<number>;

  constructor() { 
    this.tablesExampleDataArr = new Array<number>();
    this.tablesExampleDataArr.push(1);//new Table(1,"parter, lewa strona",1));
    this.tablesExampleDataArr.push(2);//new Table(2,"parter, lewa strona",2));
    this.tablesExampleDataArr.push(3);//new Table(3,"parter, lewa strona",3));
    this.tablesExampleDataArr.push(4);//new Table(4,"parter, prawa strona od okna",4));
    this.tablesExampleDataArr.push(5);//new Table(5,"I pietro, lewa strona",11));

  }

  public getAllTables() {
    return this.tablesExampleDataArr;
  }
}
