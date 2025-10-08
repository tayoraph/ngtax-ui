// src/app/store/tax.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TaxActions from './role.tax.action';
import { RoleTax } from '../../models/role-tax.model';

export interface TaxState {
  taxData: RoleTax | null;
  loading: boolean;
  error: any;
}

export const initialState: TaxState = {
  taxData: null,
  loading: false,
  error: null,
};

export const taxReducer = createReducer(
  initialState,
  on(TaxActions.loadTaxByRole, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TaxActions.loadTaxByRoleSuccess, (state, { tax }) => ({
    ...state,
    taxData: tax,
    loading: false,
    error: null,
  })),
  on(TaxActions.loadTaxByRoleFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
