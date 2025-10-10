import { createReducer, on } from '@ngrx/store';
import { TaxReformState } from '../models/tax-reform.model';
import * as TaxReformActions from '../store/actions';

export const initialState: TaxReformState = {
  allData: [],
  categoryData: null,
  roleData: null,
  taxCategoryData: [],
  loading: false,
  error: null,
};

export const taxReformReducer = createReducer(
  initialState,

  on(
    TaxReformActions.loadAllTaxData,
    TaxReformActions.loadByCategory,
    TaxReformActions.loadByRole,
    TaxReformActions.loadByTaxCategory,
    (state) => ({ ...state, loading: true, error: null })
  ),

  on(TaxReformActions.loadAllTaxDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    allData: data,
  })),

  on(TaxReformActions.loadByCategorySuccess, (state, { data }) => ({
    ...state,
    loading: false,
    categoryData: data,
  })),

  on(TaxReformActions.loadByRoleSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    roleData: data,
  })),

  on(TaxReformActions.loadByTaxCategorySuccess, (state, { data }) => ({
    ...state,
    loading: false,
    taxCategoryData: data,
  })),

  on(
    TaxReformActions.loadAllTaxDataFailure,
    TaxReformActions.loadByCategoryFailure,
    TaxReformActions.loadByRoleFailure,
    TaxReformActions.loadByTaxCategoryFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);



