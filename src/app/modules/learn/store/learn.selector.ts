import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearnState } from './learn.reducer';

export const selectLearnState = createFeatureSelector<LearnState>('learn');

export const selectAllLearns = createSelector(
    selectLearnState,
  (state) => state.learns
);
export const selectLearnLoading = createSelector(selectLearnState, (state) => state.loading);
