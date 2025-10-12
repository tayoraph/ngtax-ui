import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TaxCalculatorComponent } from '../TaxCalculator/tax-calculator.component';
import { TaxpayerFaqComponent } from '../taxpayer-faq/taxpayer-faq.component';
import { BeInformedComponent } from '../be-informed/be-informed.component';
import { LearnAccordionComponent } from '../learn/learn-accordion/learn-accordion.component';
import { ComingSoonComponent } from '../coming-soon/coming-soon.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'calculateTax', pathMatch: 'full' },
      { path: 'calculateTax', component: TaxCalculatorComponent },
      { path: 'topTaxReformFaqs', component: TaxpayerFaqComponent },
      { path: 'beinformed', component: BeInformedComponent },
      { path: 'learn', component: LearnAccordionComponent },
      { path: 'coming-soon', component: ComingSoonComponent },
      

      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
