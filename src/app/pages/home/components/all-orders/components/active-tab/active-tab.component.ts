import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-tab',
  templateUrl: './active-tab.component.html',
  styleUrls: ['./active-tab.component.scss'],
})
export class ActiveTabComponent implements OnInit {

  constructor() {
    console.log('ActiveTab konstruktor')
   }

  ngOnInit() {
  console.log('ActiveTab onInit')
  }

  ionViewWillEnter() {
    console.log('ActiveTab viewWillEnter');
  }

}
