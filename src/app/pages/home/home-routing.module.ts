import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guards/auth.guard';
import { ActiveOrdersResolverService } from 'src/app/utils/resolvers/active-orders-resolver/active-orders-resolver.service';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { ActiveTabComponent } from './components/all-orders/components/active-tab/active-tab.component';
import { ClosedTabComponent } from './components/all-orders/components/closed-tab/closed-tab.component';
import { FinishedTabComponent } from './components/all-orders/components/finished-tab/finished-tab.component';
import { HomePage } from './home.page';
const routes: Routes = [
  {
    path:'home',component:HomePage,children:[
      {
        path:'allOrders',component:AllOrdersComponent,children: [
          {
            path:'active',component:ActiveTabComponent,resolve:{activeOrders:ActiveOrdersResolverService}
          },
          {
            path:'finished',component:FinishedTabComponent
          },
          {
            path:'closed',component:ClosedTabComponent
          },
          {
            path:'',redirectTo:'active',pathMatch:'full'
          }
        ]
        
      },
      {
        path:'addOrder',component:AddOrderComponent
      },
      {
        path:'',redirectTo:'allOrders',pathMatch:'full'
      }
    ],canActivateChild:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
