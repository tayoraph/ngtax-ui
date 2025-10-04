import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../auth/store/auth.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="$event.stopPropagation()">
        <mat-icon>menu</mat-icon>
      </button>
      <span style="flex:1">Tax Calculator</span>
      <button mat-button (click)="onLogout()">Logout</button>
    </mat-toolbar>
  `
})
export class NavbarComponent {
  private store = inject(Store);
  onLogout() {
    this.store.dispatch(logout());
  }
}
