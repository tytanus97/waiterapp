import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public pages = [{
    title:'Zamówienia',
    url:'/home/allOrders'
  },
  {
    title:'Dodaj zamówienie',
    url:'/home/addOrder'
  }]

  public selectedPath;

  constructor(private router: Router,private route: ActivatedRoute) {
     this.router.events.subscribe((event:RouterEvent) => {
      this.selectedPath = event.url;
      console.log(this.selectedPath)
    })  
  }

  ngOnInit() {
 
  }

  public navigate(url: string) {
    this.router.navigate([url]);

  }

}
