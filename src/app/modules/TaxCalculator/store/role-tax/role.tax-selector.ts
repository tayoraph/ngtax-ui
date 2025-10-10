// src/app/store/tax.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaxState } from './role-tax.reducer';

export const selectTaxState = createFeatureSelector<TaxState>('tax');

export const selectTaxData = createSelector(
  selectTaxState,
  (state: TaxState) => state.taxData
);

export const selectTaxLoading = createSelector(
  selectTaxState,
  (state: TaxState) => state.loading
);

export const selectTaxError = createSelector(
  selectTaxState,
  (state: TaxState) => state.error
);
