import { createReducer, on } from '@ngrx/store';
import * as TaxActions from './tax-category.actions';
import { SubCategoryData } from '../../models/tax-category-model';

export interface TaxcategoryState {
  categories: SubCategoryData[];
  loading: boolean;
  error: any;
}

export const initialState: TaxcategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const taxCategoryReducer = createReducer(
  initialState,
  on(TaxActions.loadTaxCategories, (state) => ({ ...state, loading: true })),
 on(TaxActions.loadTaxCategoriesSuccess, (state, { categories }) => {
  console.log('🧾 Categories in Reducer:', categories); // TEMPORARY for debugging
  return {
    ...state,
    loading: false,
    categories,
  };
}),

  on(TaxActions.loadTaxCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TaxActions.loadTaxByType, (state) => ({ ...state,})),
  on(TaxActions.loadTaxByTypeSuccess, (state, { categories }) => ({
    ...state,
    
    categories,
  })),
  on(TaxActions.loadTaxByTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
