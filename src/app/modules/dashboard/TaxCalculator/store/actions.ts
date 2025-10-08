import { createAction, props } from '@ngrx/store';
import { TaxReformData, TaxRoleDetails } from '../models/tax-reform.model';

export const loadAllTaxData = createAction('[Tax Reform] Load All');
export const loadAllTaxDataSuccess = createAction('[Tax Reform] Load All Success', props<{ data: TaxReformData[] }>());
export const loadAllTaxDataFailure = createAction('[Tax Reform] Load All Failure', props<{ error: string }>());

export const loadByCategory = createAction('[Tax Reform] Load By Category', props<{ category: string }>());
export const loadByCategorySuccess = createAction('[Tax Reform] Load By Category Success', props<{ data: TaxReformData }>());
export const loadByCategoryFailure = createAction('[Tax Reform] Load By Category Failure', props<{ error: string }>());

export const loadByRole = createAction('[Tax Reform] Load By Role', props<{ role: string }>());
export const loadByRoleSuccess = createAction('[Tax Reform] Load By Role Success', props<{ data: TaxRoleDetails }>());
export const loadByRoleFailure = createAction('[Tax Reform] Load By Role Failure', props<{ error: string }>());

export const loadByTaxCategory = createAction('[Tax Reform] Load By Tax Category', props<{ taxCategory: string }>());
export const loadByTaxCategorySuccess = createAction('[Tax Reform] Load By Tax Category Success', props<{ data: TaxReformData[] }>());
export const loadByTaxCategoryFailure = createAction('[Tax Reform] Load By Tax Category Failure', props<{ error: string }>());


