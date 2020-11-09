import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './pages/home/home.module';
import { AuthenticatePageModule } from './pages/authenticate/authenticate.module';
import { CommonModule } from '@angular/common';
import { HasAnnotationPipe } from './utils/pipes/has-annotation/has-annotation.pipe';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [CommonModule,
    BrowserModule,
     IonicModule.forRoot(),
     HttpClientModule,
     AuthenticatePageModule,
     HomePageModule,
     AppRoutingModule,     
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClient
  ],
  bootstrap: [AppComponent],
  exports:[IonicModule]
})
export class AppModule {}
