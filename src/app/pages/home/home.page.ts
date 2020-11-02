import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public pages = [{
    title:'Zamówienia',
    url:'allOrders'
  },
  {
    title:'Dodaj zamówienie',
    url:'addOrder'
  }]

  public selectedPath;

  constructor(private router: Router,private route: ActivatedRoute) {
    /* this.router.events.subscribe((event:RouterEvent) => {
      this.selectedPath = event.url
      console.log(this.selectedPath)
    })  */
  }

  ngOnInit() {
 
  }

  public navigate(url: string) {
    console.log(this.route);
    this.router.navigate([`/home/${url}`]);
    console.log('XDD');

  }

}
