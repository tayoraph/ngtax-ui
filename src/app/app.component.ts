import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { LoaderComponent } from './core/loader/loader.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster],
  standalone: true
})
export class AppComponent {
  title = '';
  isLoading = true;
  constructor(public themeService: ThemeService) {
    
      // Simulate load
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
