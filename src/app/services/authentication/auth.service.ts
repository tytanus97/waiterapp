import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WaiterCredentials } from 'src/app/models/waiterCredentials';
import { Plugins } from '@capacitor/core';
import { WaiterService } from '../waiters/waiter.service';
import { Waiter } from 'src/app/models/waiter';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUser;

  constructor(private httpClient: HttpClient,private _waiterService: WaiterService) {
    this.fetchLoggedUser();
  }

  isLogged() {
    return Storage.get({'key':'loggedUser'}).then(res => {
      if(res.value) return true;
      return false;
    });
  }

  authenticate(waiterCredentials: WaiterCredentials) {
      const waiter: Waiter = this._waiterService.findWaiterByEmail(waiterCredentials.email);
      if(!waiter) {
        return of(false);
      }
      if(waiterCredentials.email === waiter.waiterEmail && waiterCredentials.password === waiter.waiterPassword) {
        Storage.set({'key':'loggedUser','value':waiterCredentials.email});
        this.fetchLoggedUser();
        return of(true);
      } else return of(false);
  }

  logOut() {
    return Storage.remove({'key':'loggedUser'});
  }

  fetchLoggedUser() {
    Storage.get({key:'loggedUser'}).then(result => 
      {
        console.log('email from mem', result.value);
        return result.value;
    }).then(email => {
      if(email) {
        const waiter = this._waiterService.findWaiterByEmail(email);
        console.log(waiter);
        this.loggedUser = waiter;
      }
    })
  }

  getLoggedWaiter() {
    return this.loggedUser;   
  }
}
