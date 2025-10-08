import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaxReformState } from '../models/tax-reform.model';

export const selectTaxReformState = createFeatureSelector<TaxReformState>('taxReform');

export const selectAllTaxData = createSelector(selectTaxReformState, (s) => s.allData);
export const selectCategoryData = createSelector(selectTaxReformState, (s) => s.categoryData);
export const selectRoleData = createSelector(selectTaxReformState, (s) => s.roleData);
export const selectTaxCategoryData = createSelector(selectTaxReformState, (s) => s.taxCategoryData);
export const selectLoading = createSelector(selectTaxReformState, (s) => s.loading);
export const selectError = createSelector(selectTaxReformState, (s) => s.error);


/// roles 
