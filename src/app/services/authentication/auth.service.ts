import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WaiterCredentials } from 'src/app/models/waiterCredentials';
import { Storage } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private httpClient: HttpClient) {
   }

  isLogged() {
    return Storage.get({'key':'loggedUser'}).then(res => {
      if(res.value) return true;
      return false;
    });
  }

  authenticate(waiterCredentials: WaiterCredentials) {
      if(waiterCredentials.firstName === 'Pawel' && waiterCredentials.lastName === 'Ataman') {
        Storage.set({'key':'loggedUser','value':waiterCredentials.firstName});
        return of(true);
      } else return of(false);
  }

  logOut() {
    return Storage.remove({'key':'loggedUser'});
  }
}
