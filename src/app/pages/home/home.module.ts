import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AppModule } from "src/app/app.module";
import { FilterByCategoryPipe } from "src/app/utils/pipes/filter-by-category.pipe";
import { HasAnnotationPipe } from "src/app/utils/pipes/has-annotation/has-annotation.pipe";
import { ActiveOrdersResolverService } from 'src/app/utils/resolvers/active-orders-resolver/active-orders-resolver.service';
import { AddOrderComponent } from "./components/add-order/add-order.component";
import { ChooseDishComponent } from "./components/add-order/components/choose-dish/choose-dish.component";
import { AllOrdersComponent } from "./components/all-orders/all-orders.component";
import { ActiveTabComponent } from './components/all-orders/components/active-tab/active-tab.component';
import { ClosedTabComponent } from './components/all-orders/components/closed-tab/closed-tab.component';
import { FinishedTabComponent } from './components/all-orders/components/finished-tab/finished-tab.component';
import { HomePageRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";

@NgModule({
  imports: [HomePageRoutingModule, IonicModule, FormsModule, CommonModule],

  declarations: [
    HomePage,
    AddOrderComponent,
    ChooseDishComponent,
    AllOrdersComponent,
    FilterByCategoryPipe,
    HasAnnotationPipe,
    ActiveTabComponent,
    FinishedTabComponent,
    ClosedTabComponent
  ],
})
export class HomePageModule {}
