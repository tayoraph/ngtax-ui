import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-error404',
  imports: [AngularSvgIconModule, ButtonComponent,CommonModule],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css',
    standalone: true,
})
export class Error404Component {
  constructor(private router: Router) {}

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
