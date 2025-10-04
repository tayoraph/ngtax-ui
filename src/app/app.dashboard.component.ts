import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `<mat-card><h2>Dashboard</h2><p>Welcome to the Tax Calculator dashboard.</p></mat-card>`
})
export class DashboardComponent {}
