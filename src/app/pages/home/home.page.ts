import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { Waiter } from 'src/app/models/waiter';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public pages = [{
    title:'Zamówienia',
    url:'/home/allOrders',
    icon:'flag'
  },
  {
    title: 'Raport',
    url:'/home/raport',
    icon:'bar-chart'
  }];

  public selectedPath;
  public loggedWaiter: Waiter;
  constructor(private _router: Router,private _route: ActivatedRoute,private _authService: AuthService) {
     this._router.events.subscribe((event:RouterEvent) => {
      this.selectedPath = event.url;
    })  
  }
  ngOnInit() {
      this.loggedWaiter = this._authService.getLoggedWaiter();
    
  }

  public navigate(url: string) {
    this._router.navigate([url]);
  }

  public logout() {
    this._authService.logOut().then(res => {
      this._router.navigate(['/authenticate']);
    })
  }

}
