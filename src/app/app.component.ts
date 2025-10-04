import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoaderComponent } from './shared/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  template: `<app-loader></app-loader><router-outlet></router-outlet>`
})
export class AppComponent {}
