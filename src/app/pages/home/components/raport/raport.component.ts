import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx'

@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
  styleUrls: ['./raport.component.scss'],
})
export class RaportComponent implements OnInit,AfterViewInit {
  public date: Date;
  public monthShort = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paz','Lis','Gru'];
  @ViewChild('dropDownBtn') private dropDownBtn;
  constructor() { }


  ngAfterViewInit(): void {
   console.log(this.dropDownBtn.el);
   setTimeout(() => {
      this.dropDownBtn.el.animate([{},
        {transform:'rotate(180deg)'}
      ],{
        duration:200,
        fill:'forwards',
        easing:'linear'
      });
   },2000);
  }

  ngOnInit() {
    this.date = new Date();
  }

  public dateChanged(event) {
    console.log(event);
    console.log(this.date);
  }

  public pickDate() {

  }
}
