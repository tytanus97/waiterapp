import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Subject } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import domtoimage from 'dom-to-image'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { Platform } from '@ionic/angular';

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;

@Component({
  selector: 'app-raport',
  templateUrl: './raport.component.html',
  styleUrls: ['./raport.component.scss'],
})
export class RaportComponent implements OnInit, AfterViewInit, OnDestroy {
  public dateStr :string;
  public monthShort = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paz', 'Lis', 'Gru'];
  public ordersByDate: Array<Order>;
  public categoryValues: Map<string, number>;
  
  public notifyCrowdnessChart: Subject<Array<Order>> = new Subject<Array<Order>>();
  public notifyCategoriesChart:  Subject<Map<string, number>> = new Subject<Map<string, number>>();

  public statsMap: Map<string,string>;
  public total;
  public totalOrders;
  public totalOrderedDishes;
  

  @ViewChild('dropDownBtn') private dropDownBtn;
  @ViewChild('dropDownList') private dropDownList;


  private dropped = false;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private _ordersService: OrdersService,
              private _toastCtrl: ToastController,
              private platform: Platform,
              private alertCtrl: AlertController) { }


  ngAfterViewInit(): void {
  }


  ngOnInit() {
    this.categoryValues = new Map();
    this.statsMap = new Map();
    
  }
  public dateChanged(event) {
    this.ordersByDate = this._ordersService
    .getAllOrdersByDateAndStatus(new Date(Date.parse(this.dateStr)), 'closed');
    if(!this.ordersByDate || !(this.ordersByDate.length > 0)) return;
    this.categoryValues.clear(); this.fetchStats();
    setTimeout(() => {
      this.notifyCrowdnessChart.next(this.ordersByDate);
      this.notifyCategoriesChart.next(this.categoryValues);
    },0);}

  public toggleDropDown() {
    this.dropDownBtn.el.animate([{},
    { transform: `rotate(${this.dropped ? 0 : 180}deg)` }
    ], {
      duration: 200,
      fill: 'forwards',
      easing: 'ease-out'
    });
    if (!this.dropped) {
      this.dropDownList.el.animate([
        { maxHeight: 0 },
        { maxHeight: '400px' }
      ], {
        duration: 600,
        fill: 'forwards',
        easing: 'ease-out'
      });
    } else {
      this.dropDownList.el.animate([
        { maxHeight: 0 }
      ], {
        duration: 200,
        fill: 'forwards',
        easing: 'ease-out'
      });
    }
    this.dropped = !this.dropped;
  }

  private fetchStats() {
    let total = 0;
    let totalOrderedDishes = 0;
    let totalOrders = 0;
    let firstOrderTime = this.ordersByDate[0].orderDate;
    let lastOrderTime = this.ordersByDate[0].orderDate;
    this.ordersByDate.flatMap(o => {
      total += o.totalPrice;
      totalOrders++;
      if(firstOrderTime.getTime() > o.orderDate.getTime()) firstOrderTime = o.orderDate;
      if(lastOrderTime.getTime() < o.orderDate.getTime()) lastOrderTime = o.orderDate;
      return o.orderedDishes;
    }).forEach(od => {
      totalOrderedDishes++;
      const category = od.dish.dishCategory;
      const value = this.categoryValues.get(category);
      this.categoryValues.set(category, value ? value + 1 : 1);
    });
    this.statsMap.set('firstOrderTime',this.formatNumber(firstOrderTime.getHours()) +
                               ':' + this.formatNumber(firstOrderTime.getMinutes()));
    this.statsMap.set('lastOrderTime',this.formatNumber(lastOrderTime.getHours())
                               + ':' + this.formatNumber(lastOrderTime.getMinutes()));
    this.statsMap.set('total',total.toFixed(2).toString());
    this.statsMap.set('totalOrderedDishes',totalOrderedDishes.toString());
    this.statsMap.set('totalOrders',totalOrders.toString());
  }

  private formatNumber(num: number): string {
    return num > 9 ? num.toString():`0${num}`;
  }

  public async generatePDF() {
    if(!this.dateStr || this.dateStr.length === 0) {
      this.showToast('Wybierz poprawną datę!','warning');
    } else {
      let crowdnessDataURL;
      let categoriesDataURL;

      const crowdnessChart = document.getElementById('crowdness');
      const categoriesChart = document.getElementById('categories');
      await domtoimage.toSvg(crowdnessChart).then(dataURL => crowdnessDataURL = dataURL)
      await domtoimage.toSvg(categoriesChart).then(dataURL => categoriesDataURL = dataURL);

      const date = this.dateStr.split('T')[0]
      const currentDate = new Date();
      const pdf = { 
        content: [
          {text:`Raport z dnia ${date}`,style:'header'},
          {text: `Wygenerowano ${currentDate.toISOString().split('T')[0]} o godzinie
           ${this.formatNumber(currentDate.getHours())}:${this.formatNumber(currentDate.getMinutes())}`
           ,style:'smallText'},
          {
            style:'table',
            table: {
              widths:[200,200],
              headerRows:1,
              body:[[{text:'Statystyki zamówień',style:'tableHeader',colSpan:2,alignment:'center'},{}],
              ['Utarg',{text:this.statsMap.get('total')+ ' zł',alignment:'right'}],
              ['Ilość zamówień',{text:this.statsMap.get('totalOrders'),alignment:'right'}],
              ['Ilosc zamówionych dań',{text:this.statsMap.get('totalOrderedDishes'),alignment:'right'}],
              ['Godzina pierwszego zamówienia',{text:this.statsMap.get('firstOrderTime'),alignment:'right'}],
              ['Godzina ostatniego zamówienia',{text:this.statsMap.get('lastOrderTime'),alignment:'right'}]]
            },
          },
          {
            style:'table',
            table: {
              widths:[200,200],
              headerRows:1,
              body:this.formatDataForCategories()
            },
          }, 
              { 
                image:crowdnessDataURL,
                width:300,
              },
              {
                image:categoriesDataURL,
                width:300
              }
        ],
        styles: {
          header: {
            fontSize:18,
            bold:true,
            margin:[0,0,0,10]
          },
          table: {
            margin: [0, 5, 10, 15]
          },
          graphHeader: {
            margin:[0,15,0,0]
          },
          tableHeader: {
            bold: true,
            fontSize: 14,
            color: 'black'
          },
          smallText: {
            bold:false,
            fontSize:9,
            color:'black'
          }
        }
      };

      const alert = await this.alertCtrl.create({
        message:'Zapisać raport pdf?',
        buttons:[
          {
            text:'Nie',
            role:'cancel'
          },
          {
            text:'Tak',
            handler:() => this.downloadPDF(pdfMake.createPdf(pdf))
          }
        ]
      })
      await alert.present();
    }
  }

  private downloadPDF(pdf) {
    if(this.platform.is('capacitor')) {
    pdf.getBase64(async data => {
      try {
        const result =  await Filesystem.writeFile({
          path:`${this.dateStr.split('T')[0]}.pdf`,
          data,
          directory:FilesystemDirectory.Documents,

          recursive:true
        });
        this.showToast('Zapisano pdf w pamięci urządzenia','success');
      } catch(e) {
        this.showToast('Nie mozna zapisac pliku','danger')
        console.error('Nie mozna zapisac pliku',e);   
      }})
    } else {
      pdf.download(`${this.dateStr.split('T')[0]}.pdf`);
      this.showToast('Zapisano pdf w pamięci urządzenia','success');
    }
  }

  private formatDataForCategories() {
    const arr = new Array<[any,any]>();
    arr.push([{text:'Statystyki kategorii dań',style:'tableHeader',colSpan:2,alignment:'center'},{}]);
    this.categoryValues.forEach((v,k) => {
      arr.push([this.capitalize(k),{text:v.toString(),alignment:'right'}]);
    });
    return arr;
  }
  private async showToast(message: string,color) {
    const warningToast = await this._toastCtrl.create({
      message:message,
      animated:true,
      duration:1500,
      position:'bottom',
      color:color
    });
    await warningToast.present();
   
  }
  private capitalize(str: string):string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  ngOnDestroy(): void {
  }
}

