import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  public authenticationForm;

  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder) { }
  ngOnInit() {

    this.authenticationForm = this.fb.group({
      firstName:[null,{validators:[Validators.required]}],
      lastName: [null,{validators:[Validators.required]}]
    })
  }


  authenticateWaiter() {
    
  }



  get firstName() {
    return this.authenticationForm.get('firstName');
  }

  get lastName() {
    
  }
  

}
