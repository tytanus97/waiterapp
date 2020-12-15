import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guards/auth.guard';
import { OrdersResolverService } from 'src/app/utils/resolvers/orders-resolver/active-orders-resolver.service';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { ActiveTabComponent } from './components/all-orders/components/active-tab/active-tab.component';
import { ClosedTabComponent } from './components/all-orders/components/closed-tab/closed-tab.component';
import { FinishedTabComponent } from './components/all-orders/components/finished-tab/finished-tab.component';
import { RaportComponent } from './components/raport/raport.component';
import { HomePage } from './home.page';
const routes: Routes = [
  {
    path: 'home', component: HomePage, children: [
      {
        path: 'allOrders',
        component: AllOrdersComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'active',
            component: ActiveTabComponent,
            canActivateChild: [AuthGuard],
            resolve: { activeOrders: OrdersResolverService },
            data: { status: 'active' }
          },
          {
            path: 'finished',
            component: FinishedTabComponent,
            canActivateChild: [AuthGuard],
            resolve: { finishedOrders: OrdersResolverService },
            data: { status: 'finished' }
          },
          {
            path: 'closed',
            component: ClosedTabComponent,
            canActivateChild: [AuthGuard],
            resolve: { closedOrders: OrdersResolverService },
            data: { status: 'closed' }
          },
          {
            path: '',
            redirectTo: 'active',
            pathMatch: 'full'
          }
        ]

      },
      {
        path: 'raport',
        canActivateChild: [AuthGuard],
        component: RaportComponent
      },
      {
        path: '',
        redirectTo: 'allOrders',
        pathMatch: 'full'
      }
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
