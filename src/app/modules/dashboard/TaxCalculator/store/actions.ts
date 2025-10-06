import { createAction, props } from '@ngrx/store';
import { TaxReform } from '../models/tax-reform.model';

export const loadTaxReform = createAction('[TaxReform] Load All');
export const loadTaxReformSuccess = createAction(
  '[TaxReform] Load All Success',
  props<{ data: TaxReform[] }>()
);
export const loadTaxReformFailure = createAction(
  '[TaxReform] Load All Failure',
  props<{ error: any }>()
);

export const loadByRole = createAction(
  '[TaxReform] Load By Role',
  props<{ role: string }>()
);
export const loadByRoleSuccess = createAction(
  '[TaxReform] Load By Role Success',
  props<{ data: any }>()
);
export const loadByRoleFailure = createAction(
  '[TaxReform] Load By Role Failure',
  props<{ error: any }>()
);
