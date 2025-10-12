import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubCategoryData } from '../../models/tax-category-model';
import { TaxcategoryState } from './tax-category.reducer';


// Feature key (used when registering reducer)
export const taxFeatureKey = 'tax';

// Base feature selector
export const selectTaxCategoryState = createFeatureSelector<TaxcategoryState>(taxFeatureKey);

// Select all tax categories
export const selectAllCategories = createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => {
    console.log(state.categories)
    return state.categories;
  }
);


// Select loading state
export const selectTaxLoading = createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => state.loading
);

// Select error
export const selectTaxError = createSelector(
  selectTaxCategoryState,
  (state: TaxcategoryState) => state.error
);

// Select categories by subcategory name
// export const selectCategoryByName = (subCategoryName: string) =>
//   createSelector(selectAllCategories, (categories: SubCategoryData[]) =>
//     categories.find(cat => cat.name === subCategoryName)
//   );
