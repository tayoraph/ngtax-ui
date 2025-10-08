import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { LoaderComponent } from './core/loader/loader.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/Utils/store';
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
  constructor(public themeService: ThemeService, private store: Store<AppState>) {
    
    this.store.subscribe(state => {
      // console.log('🔁 Store state:', state);
    });
      // Simulate load
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  toggleTheme(mode:string = 'dark') {
  document.body.classList.toggle(mode);
}

}
