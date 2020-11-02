import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { WaiterCredentials } from 'src/app/models/waiterCredentials';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  public authenticationForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder
    ,private toastController: ToastController) { }
  ngOnInit() {
    this.authenticationForm = this.fb.group({
      firstName:[null,{validators:[Validators.required]}],
      lastName: [null,{validators:[Validators.required]}]
    })
  }

  authenticateWaiter() {
      if(this.authenticationForm.valid && !this.authenticationForm.pending) {
        const firstName = this.authenticationForm.get('firstName').value.trim();
        const lastName = this.authenticationForm.get('lastName').value.trim();        
        const waiterCredentials: WaiterCredentials = {firstName:firstName,lastName:lastName}
        this.authService.authenticate(waiterCredentials).pipe(take(1)).subscribe(response => {
          if(!response) this.presentErrorLoginToast('Niepoprawne dane logowania!');
          else this.router.navigate(['/home'])
          });
      } else {
        this.presentErrorLoginToast('Nieprawidłowo wypełniony formularz!');
      }
  }

  get firstName() {
    return this.authenticationForm.get('firstName');
  }

  get lastName() {
    return this.authenticationForm.get('lastNmae');
  }

  async presentErrorLoginToast(message: string) {
      const toast = await this.toastController.create({
        message:message,
        duration:2000,
        position:'bottom',
        animated:true,
        color:'danger'
      })
      toast.present();
  }
  
}
