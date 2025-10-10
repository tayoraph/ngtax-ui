import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { TaxCalculatorComponent } from '../TaxCalculator/tax-calculator.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

   { path: 'calculateTax', component: TaxCalculatorComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}