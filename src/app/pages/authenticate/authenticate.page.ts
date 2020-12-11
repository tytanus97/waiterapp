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
      email:[null,{validators:[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]}],
      password: [null,{validators:[Validators.required]}]
    })
  }

  public ionViewWillEnter() {
    this.authenticationForm.reset();
    console.log('enter');
  }

  authenticateWaiter() {
      if(this.authenticationForm.valid && !this.authenticationForm.pending) {
        const email = this.authenticationForm.get('email').value.trim();
        const password = this.authenticationForm.get('password').value.trim();        
        const waiterCredentials: WaiterCredentials = {email:email,password:password}
        this.authService.authenticate(waiterCredentials).pipe(take(1)).subscribe(response => {
          if(!response) this.presentErrorLoginToast('Niepoprawne dane logowania!');
          else this.router.navigate(['/home'])
          });
      } else {
        this.presentErrorLoginToast('Nieprawidłowo wypełniony formularz!');
      }
  }

  get email() {
    return this.authenticationForm.get('email');
  }

  get password() {
    return this.authenticationForm.get('password');
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
