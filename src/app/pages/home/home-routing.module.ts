import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guards/auth.guard';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { HomePage } from './home.page';
const routes: Routes = [
  {
    path:'home',component:HomePage,children:[
      {
        path:'allOrders',component:AllOrdersComponent
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
