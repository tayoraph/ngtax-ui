// app.routes.ts or wherever you're defining routes

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './app.dashboard.component';
import { authGuard } from './auth/guard/auth.guard';
import { LandingComponent } from './layout/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Public Landing Page at '/'
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
