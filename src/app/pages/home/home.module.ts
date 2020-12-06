import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { IonicModule } from "@ionic/angular";
import { AnimateDropdownDirective } from 'src/app/utils/directives/animate-dropdown/animate-dropdown.directive';
import { CardActionBarAnimationDirective } from 'src/app/utils/directives/card-action-bar-animation/card-action-bar-animation.directive';
import { FilterByCategoryPipe } from "src/app/utils/pipes/filter-by-category.pipe";
import { QuantityByStatusPipe } from 'src/app/utils/pipes/quantity-by-status/quantity-by-status.pipe';
import { SortByTimePipe } from 'src/app/utils/pipes/sort-by-time/sort-by-time.pipe';
import { OrdersResolverService } from 'src/app/utils/resolvers/orders-resolver/active-orders-resolver.service';
import { AddOrderComponent } from "./components/add-order/add-order.component";
import { ChooseDishComponent } from "./components/add-order/components/choose-dish/choose-dish.component";
import { QuestionnaireComponent } from './components/add-order/components/questionnaire/questionnaire.component';
import { AllOrdersComponent } from "./components/all-orders/all-orders.component";
import { ActiveTabComponent } from './components/all-orders/components/active-tab/active-tab.component';
import { ClosedTabComponent } from './components/all-orders/components/closed-tab/closed-tab.component';
import { FinishedTabComponent } from './components/all-orders/components/finished-tab/finished-tab.component';
import { RaportComponent } from './components/raport/raport.component';
import { WaiterComponent } from './components/waiter/waiter.component';
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
    ActiveTabComponent,
    FinishedTabComponent,
    ClosedTabComponent,
    WaiterComponent,
    RaportComponent,
    SortByTimePipe,
    QuantityByStatusPipe,
    CardActionBarAnimationDirective,
    QuestionnaireComponent,
    AnimateDropdownDirective
  ],
  providers:[OrdersResolverService],
  exports:[SortByTimePipe,QuantityByStatusPipe]
})
export class HomePageModule {}
