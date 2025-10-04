import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/layout/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
 {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
  },
 {
  path: 'auth',
  loadChildren: () =>
    import('./modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
},
{
  path: 'errors',
  loadChildren: () => import('./modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
},
  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
