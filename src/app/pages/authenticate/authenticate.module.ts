import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticatePageRoutingModule } from './authenticate-routing.module';
import { AuthenticatePage } from './authenticate.page';

@NgModule({
  imports: [
    AuthenticatePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule
  ],
  declarations: [AuthenticatePage]
})
export class AuthenticatePageModule {}
