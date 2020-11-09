import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AppModule } from "src/app/app.module";
import { FilterByCategoryPipe } from "src/app/utils/pipes/filter-by-category.pipe";
import { HasAnnotationPipe } from "src/app/utils/pipes/has-annotation/has-annotation.pipe";
import { AddOrderComponent } from "./components/add-order/add-order.component";
import { ChooseDishComponent } from "./components/add-order/components/choose-dish/choose-dish.component";
import { AllOrdersComponent } from "./components/all-orders/all-orders.component";
import { HomePageRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";

@NgModule({
  imports: [HomePageRoutingModule, IonicModule, BrowserModule, FormsModule],

  declarations: [
    HomePage,
    AddOrderComponent,
    ChooseDishComponent,
    AllOrdersComponent,
    FilterByCategoryPipe,
    HasAnnotationPipe,
  ],
})
export class HomePageModule {}
