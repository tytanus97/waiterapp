import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
  styleUrls: ['./raport.component.scss'],
})
export class RaportComponent implements OnInit {
  public date: Date;
  public monthShort = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paz','Lis','Gru'];
  constructor() { }

  ngOnInit() {}

  public dateChanged(event) {
    console.log(event);
    console.log(this.date);
  }
}
