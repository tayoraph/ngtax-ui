// src/app/store/tax.actions.ts
import { createAction, props } from '@ngrx/store';
import { RoleTax } from '../../models/role-tax.model';

export const loadTaxByRole = createAction(
  '[Tax] Load Tax By Role',
  props<{ role: string; income: number }>()
);

export const loadTaxByRoleSuccess = createAction(
  '[Tax] Load Tax By Role Success',
  props<{ tax: RoleTax| null }>()
);

export const loadTaxByRoleFailure = createAction(
  '[Tax] Load Tax By Role Failure',
  props<{ error: any }>()
);
