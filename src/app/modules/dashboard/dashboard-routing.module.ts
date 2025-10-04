import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { TaxCalculatorComponent } from './TaxCalculator/tax-calculator.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'calculateTax', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'calculateTax', component: TaxCalculatorComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
