import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticatePageModule } from './pages/authenticate/authenticate.module';
import { HomePageModule } from './pages/home/home.module';
import { AuthGuard } from './utils/guards/auth.guard';

const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full' },
  {
      path:'home',canActivate:[AuthGuard],
      loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path:'authenticate',
    loadChildren: () => import('../app/pages/authenticate/authenticate.module').then(m => m.AuthenticatePageModule)
  }, 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
