// src/app/components/loader/loader.component.ts
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/Utils/store';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="loader$ | async" class="loader-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loader$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loader$ = store.pipe(select(state => state.loader));
  }
}
