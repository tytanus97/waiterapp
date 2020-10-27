import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogged: boolean = false;

  constructor(private httpClient: HttpClient) {

    setTimeout(() => {

      this.logOut();
    },1000*60*60*8);

   }

  isLogged() {
    return this._isLogged;
  }

  logIn() {
    if(!this._isLogged) {
      this._isLogged = true;
    }
  }


  logOut() {
    if(!this._isLogged) {
      this._isLogged = false;
    }
  }
}
