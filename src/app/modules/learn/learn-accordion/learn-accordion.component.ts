import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Learn } from '../learn.model';
import { Observable } from 'rxjs';
import * as LearnActions from '../store/learn.actions';
import * as LearnSelectors from '../store/learn.selector';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-learn-accordion',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './learn-accordion.component.html',
  styleUrls: ['./learn-accordion.component.css'],
  animations: [
    trigger('fadeSlide', [
      state('closed', style({ height: '0px', opacity: 0, paddingTop: '0', paddingBottom: '0', overflow: 'hidden' })),
      state('open', style({ height: '*', opacity: 1, paddingTop: '0.5rem', paddingBottom: '1rem', overflow: 'hidden' })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ])
  ],

})
export class LearnAccordionComponent {
  learns$!: Observable<Learn[]>;
  activeIndex: number | null = null;

  newTitle = '';
  newContent = '';

  constructor(private store: Store) {
    this.learns$ = this.store.select(LearnSelectors.selectAllLearns);
  }

  ngOnInit() {
    // Load all Learn items first
    this.store.dispatch(LearnActions.loadLearns());
  }

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  addLearn() {
    if (this.newTitle && this.newContent) {
      this.store.dispatch(LearnActions.addLearn({ learn: { title: this.newTitle, content: this.newContent } }));
      this.newTitle = '';
      this.newContent = '';
    }
  }
}