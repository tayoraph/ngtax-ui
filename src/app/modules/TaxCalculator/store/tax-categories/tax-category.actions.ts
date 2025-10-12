import { createAction, props } from '@ngrx/store';
import { SubCategoryData } from '../../models/tax-category-model';

// Load all categories
export const loadTaxCategories = createAction('[Tax] Load Tax Categories');
export const loadTaxCategoriesSuccess = createAction(
  '[Tax] Load Tax Categories Success',
  props<{ categories: SubCategoryData[] }>()
);
export const loadTaxCategoriesFailure = createAction(
  '[Tax] Load Tax Categories Failure',
  props<{ error: any }>()
);

// Load by category type
export const loadTaxByType = createAction(
  '[Tax] Load Tax By Type',
  props<{ categoryType: 'Individuals' | 'Businesses' }>()
);
export const loadTaxByTypeSuccess = createAction(
  '[Tax] Load Tax By Type Success',
  props<{ categories: SubCategoryData[] }>()
);
export const loadTaxByTypeFailure = createAction(
  '[Tax] Load Tax By Type Failure',
  props<{ error: any }>()
);
