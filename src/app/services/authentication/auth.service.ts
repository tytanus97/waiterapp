import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WaiterCredentials } from 'src/app/models/waiterCredentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private _isLogged: boolean = false;

  constructor(private httpClient: HttpClient) {
   }

  isLogged() {
    return this._isLogged;
  }

  authenticate(waiterCredentials: WaiterCredentials): Observable<Boolean> {
      if(waiterCredentials.firstName === 'Pawel' && waiterCredentials.lastName === 'Ataman') {
      this._isLogged = true;
      } else return of(false);
    return of(true);
  }

  logOut() {
    if(!this._isLogged) {
      this._isLogged = false;
    }
  }
}
