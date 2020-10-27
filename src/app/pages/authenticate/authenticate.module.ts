import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticatePageRoutingModule } from './authenticate-routing.module';
import { AuthenticatePage } from './authenticate.page';

@NgModule({
  imports: [
    AuthenticatePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AuthenticatePage]
})
export class AuthenticatePageModule {}
