import { createReducer, on } from '@ngrx/store';
import * as TaxReformActions from './actions';
import { TaxReform } from '../models/tax-reform.model';

export interface State {
  all: TaxReform[];
  roleData: any;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  all: [],
  roleData: null,
  loading: false,
  error: null,
};

export const taxReformReducer = createReducer(
  initialState,
  on(TaxReformActions.loadTaxReform, state => ({ ...state, loading: true })),
  on(TaxReformActions.loadTaxReformSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    all: data,
  })),
  on(TaxReformActions.loadTaxReformFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TaxReformActions.loadByRole, state => ({ ...state, loading: true })),
  on(TaxReformActions.loadByRoleSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    roleData: data,
  })),
  on(TaxReformActions.loadByRoleFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
